;(function () {
    // "use strict";
    angular
        .module('app')
        .controller('Settings', Settings);

    Settings.$inject = ['$rootScope', '$scope', '$jrCrop', '$q', 'site', 'user', 'userInfo', 'toastr', 'Upload'];

    function Settings($rootScope, $scope, $jrCrop, $q, site, user, userInfo, toastr, Upload) {

        $rootScope.page = {
            title: 'Налаштування'
        };

        var vm = this;

        vm.label = userInfo.label;
        vm.croppedImage = null;
        vm.data = userInfo.user;
        vm.save = save;
        vm.changeCity = changeCity;

        vm.data.photo2 = null;

        if (userInfo.my_classes) {
            vm.my_classes = userInfo.my_classes.map(function (item) {
                return item.number;
            });
        } else {
            vm.my_classes = [];
        }

        vm.selectedItem = vm.data.sity_name;

        site.getSchools(vm.data.sity_name)
            .then(function (response) {
                vm.schools = response.schools.models;
                vm.data.school_id = vm.schools[1];
            });


        function save(form) {
            if (form.$invalid) {
                toastr.error("Ви ввели не всі дані");
                return;
            }

            delete vm.data.photo;
            if (vm.croppedImage) {
                var tmp = vm.croppedImage.split(';', 2);

                vm.data.extension = tmp[0].split(':', 2)[1].split('/', 2)[1];
                vm.data.image_file = tmp[1].split(',', 2)[1];
            }

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

        vm.gmapsService = new google.maps.places.AutocompleteService();
        vm.search = search;

        function search(address) {
            var deferred = $q.defer();
            getResults(address).then(
                function (predictions) {
                    var results = [];
                    for (var i = 0, prediction; prediction = predictions[i]; i++) {
                        results.push(prediction);
                    }
                    deferred.resolve(results);
                }
            );
            return deferred.promise;
        }

        function getResults(address) {
            var deferred = $q.defer();
            vm.gmapsService.getPlacePredictions({
                input: address,
                types: ['(cities)'],
                componentRestrictions: {country: 'ua'}
            }, function (data) {
                console.log(data);
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function changeCity(){
            vm.data.sity_name = vm.selectedItem.terms[0].value;
            vm.data.region_name = vm.selectedItem.terms[1].value;
            site.getSchools(vm.data.sity_name)
                .then(function (response) {
                    vm.schools = response.schools.models;
                    vm.data.school_id = vm.schools[1];
                });
        }
    }
})();
