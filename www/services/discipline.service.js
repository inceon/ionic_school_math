;(function () {
    'use strict';

    angular
        .module('model.discipline', [])
        .service('discipline', discipline);

    discipline.$inject = ['http', 'url'];
    function discipline(http, url) {

        var service = {
            one: one,
            all: all
        };
        return service;

        function one(id) {
            return http.get(
                url.discipline.one,
                {
                    id: id
                }
            )
        }

        function all() {
            return http.get(
                url.discipline.all,
                {}
            )
        }
    }
})();
