;(function () {
    'use strict';

    angular
        .module('model.discipline', [])
        .service('discipline', discipline);

    discipline.$inject = ['http', 'url'];
    function discipline(http, url) {

        return {
            one: one,
            all: all,
            books: books
        };

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

        function books(id) {
            return http.get(
                url.discipline.books,
                {
                    discipline_id: id
                }
            )
        }
    }
})();
