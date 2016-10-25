;(function () {
    // 'use strict';
    angular
        .module('app')
        .controller('Registration', Registration);

    Registration.$inject = ['user', 'site', 'discipline', '$scope'];

    function Registration(user, site, discipline, $scope) {

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCkSnpfwNLeEWBxrvb81-k2puMWIkTg_nM&signed_in=true&libraries=places&callback=initAutocomplete';
        document.body.appendChild(script);

        var vm = this;

        vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        vm.registerData = {
            classes: []
        };
        vm.schools = [];
        vm.full_class = [];
        // vm.registerData.school_id = 2;

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
            return site.getSchools(city)
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

                console.log('rgre');

                for (var i = 0; i < place.address_components.length; i++) {
                    var addressType = place.address_components[i].types[0];
                    if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        if (addressType == 'locality') {
                            vm.registerData.sity_name = val;
                        } else if (addressType == 'administrative_area_level_1') {
                            vm.registerData.region_name = val;
                        }
                    }
                }

                if (vm.registerData.sity_name) {
                    getSchools(vm.registerData.sity_name).then(function (response) {
                        console.log(response);
                        vm.schools = response.schools;
                        vm.registerData.school_id = vm.schools[1];
                    });
                }

                $scope.$apply();
            });
        }

    }
})();
