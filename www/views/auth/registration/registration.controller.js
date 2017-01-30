;(function () {
    // 'use strict';
    angular
        .module('app')
        .controller('Registration', Registration);

    Registration.$inject = ['user', 'site', '$jrCrop', '$q', '$scope', 'prepGetLabels', 'Upload'];

    function Registration(user, site, $jrCrop, $q, $scope, prepGetLabels, Upload) {

        var vm = this;

        vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        /*vm.registerData = {
         phone: Math.floor(Math.random() * (9999999999 - 1111111111) + 1111111111),
         password: '111111',
         first_name: 'User',
         second_name: 'User',
         last_name: '12345454',
         role_id: 2,
         school_id: 3,
         sity_id: 1,
         class: Math.floor(Math.random() * (11 - 3) + 3)
         };*/

        vm.registerData = {};
        if(window.plugins && window.plugins.sim) {
            window.plugins.sim.getSimInfo(function (data) {
                vm.registerData.phone = data.phoneNumber.slice(2);
            });
        }

        vm.schools = null;
        vm.role = [
            {
                name: 'Ученик',
                id: 1
            },
            {
                name: 'Учитель',
                id: 2
            }
        ];
        vm.full_class = [];

        vm.label = prepGetLabels.label;

        vm.register = register;
        vm.upload = upload;
        vm.changeCity = changeCity;

        function register(form) {
            if (form.$invalid) {
                return;
            }
            console.log(vm.registerData);

            if (vm.croppedImage) {
                var tmp = vm.croppedImage.split(';', 2);

                vm.registerData.extension = tmp[0].split(':', 2)[1].split('/', 2)[1];
                vm.registerData.image_file = tmp[1].split(',', 2)[1];
            }


            // vm.registerData.role_id = vm.registerData.role_id.id;
            // vm.registerData.school_id = vm.registerData.school_id.id;
            user.register(vm.registerData);
        }

        function upload($file) {
            Upload.base64DataUrl($file).then(function (base64) {
                if ($file) {
                    $jrCrop.crop({
                        url: base64,
                        width: 200,
                        height: 200,
                        circle: true,
                        chooseText: 'Обрати',
                        cancelText: 'Відмінити'
                    }).then(function (canvas) {
                        vm.registerData.image_file = canvas.toDataURL();
                        vm.croppedImage = canvas.toDataURL();
                    }, function () {
                        delete vm.registerData.image_file;
                    });
                }
                // vm.registerData.image_file = base64.split(',',2)[1];
            });
        }

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
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function changeCity() {
            console.log(vm.selectedItem);
            vm.registerData.sity_name = vm.selectedItem.terms[0].value;
            vm.registerData.region_name = vm.selectedItem.terms[1].value;
            site.getSchools(vm.registerData.sity_name)
                .then(function (response) {
                    vm.schools = response.schools.models;
                    vm.registerData.school_id = vm.schools[1];
                });
        }
    }
})();
