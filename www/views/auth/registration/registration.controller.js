;(function () {
    // 'use strict';
    angular
        .module('app')
        .controller('Registration', Registration);

    Registration.$inject = ['user', 'site', 'discipline', '$scope', 'prepGetLabels'];

    function Registration(user, site, discipline, $scope, prepGetLabels) {

        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://maps.googleapis.com/maps/api/' +
            'js?key=AIzaSyCkSnpfwNLeEWBxrvb81-k2puMWIkTg_nM&signed_in=true&libraries=places&callback=initAutocomplete';
        document.body.appendChild(script);

        var vm = this;

        vm.emailRegExp = /^((([a-zA-Z\-0-9_.])+[a-zA-Z0-9_.]{2,})|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        vm.registerData = {
            classes: []
        };

        vm.schools = null;
        vm.full_class = [];
        vm.submit = reg;

        vm.label = prepGetLabels.label;

        function reg(){
            if (vm.form.$invalid) { return; }
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
                            vm.schools = response.schools;
                            vm.registerData.school_id = vm.schools[1];
                        });
                }

                $scope.$apply();
            });
        };

    }
})();
