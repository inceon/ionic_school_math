;(function () {
    'use strict';
    angular
        .module('app')
        .controller('Registration', Registration);

    Registration.$inject = ['user', 'site', 'discipline'];

    function Registration(user, site, discipline) {


        var vm = this;

        vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        vm.registerData = {
            classes: []
        };
        vm.schools = [];
        vm.full_class = [];

        vm.getSchools = getSchools;
        vm.getDisciplines = getDisciplines;

        activate();

        function activate() {
            getLabels();
            getDisciplines();
        }

        function getLabels() {
            site.getLabels(
                "user",
                function (data) {
                    vm.label = data.label;
                }
            );
        }

        function getSchools(city) {
            site.getSchools(
                city,
                function (data) {
                    vm.schools = data.schools;
                }
            )

        }

        function getDisciplines() {
            discipline.all(
                function (data) {
                    vm.disciplines = data.models;
                }
            )
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
                        if (addressType == 'locality') {
                            vm.user.sity_name = val;
                        } else if (addressType == 'administrative_area_level_1') {
                            vm.user.region_name = val;
                        }
                    }
                }

                if (vm.registerData.city) {
                    getSchools(vm.registerData.city)
                }

                $scope.$apply();
            });
        }

    }
})();
