;(function () {
    'use strict';

    angular
        .module('model.book', [])
        .service('book', book);

    book.$inject = ['http', 'url'];
    function book(http, url) {

        return {
            sections: sections,
            themes: themes
        };

        function sections(id) {
            return http.get(
                url.book.sections,
                {
                    book_id: id
                }
            )
        }

        function themes(id) {
            return http.get(
                url.book.themes,
                {
                    section_id: id
                }
            )
        }
    }
})();
