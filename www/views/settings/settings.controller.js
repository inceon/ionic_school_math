;(function () {
    // "use strict";
    angular
        .module('app')
        .controller('Settings', Settings);

    Settings.$inject = ['$rootScope', 'user', 'userInfo', 'toastr', 'Upload'];

    function Settings ($rootScope, user, userInfo, toastr, Upload) {

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

        vm.data = userInfo.user;
        if(userInfo.my_classes) {
            vm.my_classes = userInfo.my_classes.map(function (item) {
                return item.number;
            });
        } else {
            vm.my_classes = [];
        }

        vm.save = save;
        vm.upload = upload;

        function save (form) {
            if (form.$invalid) {
                toastr.error("Ви ввели не всі дані");
                return;
            }
            console.log(vm.data);
            delete vm.data.photo;
            // if (vm.data.image_file)
            //     vm.data.image_file = vm.data.image_file.base64;

            user.update(vm.data)
                .then(function(response){
                    vm.data.photo = response.user.photo;
                    toastr.success("Дані успішно оновлені");
                });
        }

        function upload($file) {
            console.log($file);
            vm.data.extension = $file.type.split('/')[1];
            Upload.base64DataUrl($file).then(function(base64){
                // console.log(urls);
                vm.data.image_file = base64.split(',',2)[1];
            });
        }

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
                            vm.registerData.sity_name = val;
                        } else if (addressType === 'administrative_area_level_1') {
                            vm.registerData.region_name = val;
                        }
                    }
                }

                if (vm.registerData.sity_name) {
                    site.getSchools(vm.registerData.sity_name)
                        .then(function (response) {
                            vm.schools = response.schools.models;
                            vm.registerData.school_id = vm.schools[1];
                        });
                }

                $scope.$apply();
            });
        };

    }

})();
