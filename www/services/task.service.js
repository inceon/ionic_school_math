;(function () {
    'use strict';

    angular
        .module('model.task', [])
        .service('task', task);

    task.$inject = ['http', 'url'];
    function task(http, url) {

        return {
            all: all,
            one: one,
            answer: answer,
            update: update,
            last: last
        };

        function all(id) {
            return http.get(
                url.task.all,
                {
                    theme_id: id
                }
            )
        }

        function one(id) {
            return http.get(
                url.task.one,
                {
                    id: id
                }
            )
        }

        function answer(data) {
            var fd = new FormData();
            for (var field in data) {
                if (data.hasOwnProperty(field)) {
                    if (data[field] !== null) {
                        fd.append(field, data[field]);
                    }
                }
            }
            return http.file(url.task.answer, fd);
        }

        function update(data) {
            var fd = new FormData();
            for (var field in data) {
                if (data.hasOwnProperty(field)) {
                    if (data[field] !== null) {
                        fd.append(field, data[field]);
                    }
                }
            }
            return http.file(url.task.update, fd);
        }

        function last(data) {
            return http.get(
                url.task.last
            )
        }
    }
})();
