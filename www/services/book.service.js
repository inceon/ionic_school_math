;(function () {
    'use strict';

    angular
        .module('model.book', [])
        .service('book', book);

    book.$inject = ['http', 'url'];
    function book(http, url) {

        return {
            sections: sections,
            themes: themes,
            task: {
                all: task_all,
                one: task_one
            }
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

        function task_all(id) {
            return http.get(
                url.book.tasks,
                {
                    theme_id: id
                }
            )
        }

        function task_one(id) {
            return http.get(
                url.book.task,
                {
                    id: id
                }
            )
        }
    }
})();
