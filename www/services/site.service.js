;(function () {
    'use strict';

    angular
        .module('model.site', [])
        .service('site', site);

    site.$inject = ['http', 'url'];
    function site(http, url) {

        return {
            getLabels: getLabels,
            getSchools: getSchools
        };

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
