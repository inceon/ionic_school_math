;(function () {
    'use strict';

    angular
        .module('model.book', [])
        .service('book', book);

    book.$inject = ['http', 'url', 'cache'];
    function book(http, url, cache) {

        return {
            create: create,
            update: update,
            sections: sections,
            themes: themes,
            task: {
                all: task_all,
                one: task_one
            }
        };

        function create (id) {
            cache.delete('my-book');
            return http.post(
                url.myBook.create,
                {
                    book_discipline_id: id
                }
            )
        }

        function update (data) {
            cache.delete('my-book');
            return http.post(
                url.myBook.update,
                data
            )
        }

        function sections(id) {
            return http.get(
                url.book.sections,
                {
                    book_id: id
                },
                true
            )
        }

        function themes(id) {
            return http.get(
                url.book.themes,
                {
                    section_id: id
                },
                true
            )
        }

        function task_all(id) {
            return http.get(
                url.book.tasks,
                {
                    theme_id: id
                },
                true
            )
        }

        function task_one(id) {
            return http.get(
                url.book.task,
                {
                    id: id
                },
                true
            )
        }
    }
})();
