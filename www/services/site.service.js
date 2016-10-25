;(function () {
    'use strict';

    angular
        .module('model.site', [])
        .service('site', site);

    site.$inject = ['http', 'url'];
    function site(http, url) {

        var service = {
            getLabels: getLabels,
            getSchools: getSchools
        };
        return service;

        function getLabels(model) {
            return http.get(
                url.site.getLabels,
                {
                    model: model
                }
            )
        }

        function getSchools(city) {
            return http.get(
                url.site.getInform,
                {
                    sity_name: city
                }
            )
        }
    }

})();
