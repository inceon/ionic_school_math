;(function () {
    'use strict';

    angular
        .module('model.theory', [])
        .service('theory', theory);

    theory.$inject = ['http', 'url'];
    function theory(http, url) {

        return {
            all: all,
            one: one,
        };

        function all(data) {
            return http.get(
                url.theory.all,
                data
            )
        }

        function one(id) {
            return http.get(
                url.theory.one,
                {
                    id: id
                }
            )
        }

    }
})();
