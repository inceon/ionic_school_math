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
            books: books,
            myBook: myBook
        };

        function one(id) {
            return http.get(
                url.discipline.one,
                {
                    id: id
                },
                true
            )
        }

        function all() {
            return http.get(
                url.discipline.all,
                {},
                true
            )
        }

        function books(id) {
            return http.get(
                url.discipline.books,
                {
                    discipline_id: id
                },
                true
            )
        }

        function myBook(id){
            return http.get(
                url.discipline.myBook,
                {
                    discipline_id: id
                },
                true
            )
        }
    }
})();
