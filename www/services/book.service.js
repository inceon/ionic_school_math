;(function () {
    'use strict';

    angular
        .module('model.book', [])
        .service('book', book);

    book.$inject = ['http', 'url'];
    function book(http, url) {

        return {
            sections: sections
        };

        function sections(id) {
            return http.get(
                url.book.sections,
                {
                    book_id: id
                }
            )
        }
    }
})();
