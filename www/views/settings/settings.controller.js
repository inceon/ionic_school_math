;(function () {
    // "use strict";
    angular
        .module('app')
        .controller('Settings', Settings);

    Settings.$inject = ['$rootScope', '$scope', '$jrCrop', '$ionicModal', 'site', 'user', 'userInfo', 'toastr', 'Upload'];

    function Settings($rootScope, $scope, $jrCrop, $ionicModal, site, user, userInfo, toastr, Upload) {

        $rootScope.page = {
            title: 'Налаштування'
        };

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/' +
            'js?key=AIzaSyCkSnpfwNLeEWBxrvb81-k2puMWIkTg_nM&libraries=places&callback=initAutocomplete&language=ru';
        document.body.appendChild(script);

        var vm = this;

        vm.label = userInfo.label;
        vm.croppedImage = null;
        vm.data = userInfo.user;

        vm.data.photo2 = null;

        if (userInfo.my_classes) {
            vm.my_classes = userInfo.my_classes.map(function (item) {
                return item.number;
            });
        } else {
            vm.my_classes = [];
        }

        site.getSchools(vm.data.sity_name)
            .then(function (response) {
                vm.schools = response.schools.models;
                vm.data.school_id = vm.schools[1];
            });

        vm.save = save;

        function save(form) {
            if (form.$invalid) {
                toastr.error("Ви ввели не всі дані");
                return;
            }

            delete vm.data.photo;

            var tmp = vm.croppedImage.split(';', 2);

            vm.data.extension = tmp[0].split(':', 2)[1].split('/', 2)[1];
            vm.data.image_file = tmp[1].split(',', 2)[1];

            console.log(vm.data);

            user.update(vm.data)
                .then(function (response) {
                    delete vm.data.photo2;
                    vm.data.photo = response.user.photo;
                    toastr.success("Дані успішно оновлені");
                });
        }

        $scope.upload = function ($file) {
            delete vm.croppedImage;
            Upload.base64DataUrl($file)
                .then(function (base64) {
                    if($file) {
                        $jrCrop.crop({
                            url: base64,
                            width: 200,
                            height: 200,
                            circle: true,
                            chooseText: 'Обрати',
                            cancelText: 'Відмінити'
                        }).then(function (canvas) {
                            vm.croppedImage = canvas.toDataURL();
                        });
                    }
                });
        };

        initAutocomplete = function () {

            var componentForm = {
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
            };

            var options = {
                types: ['(cities)'],
                componentRestrictions: {country: 'ua'}
            };

            var inputFrom = document.getElementById('autocomplete');
            var autocompleteForm = new google.maps.places.Autocomplete(inputFrom, options);

            google.maps.event.addListener(autocompleteForm, 'place_changed', function () {
                var place = autocompleteForm.getPlace();

                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        if (addressType === 'locality') {
                            vm.data.sity_name = val;
                        } else if (addressType === 'administrative_area_level_1') {
                            vm.data.region_name = val;
                        }
                    }
                }

                if (vm.data.sity_name) {
                    site.getSchools(vm.data.sity_name)
                        .then(function (response) {
                            vm.schools = response.schools.models;
                            vm.data.school_id = vm.schools[1];
                        });
                }

                $scope.$apply();
            });
        };

    }

})();
