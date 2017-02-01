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
            last: last,
            subtasks: subtasks
        };

        function all(id) {
            return http.get(
                url.task.all,
                {
                    theme_id: id
                },
                true
            )
        }

        function one(id) {
            return http.get(
                url.task.one,
                {
                    id: id
                },
                true
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
            return http.file(url.doneTask.answer, fd);
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
            return http.file(url.doneTask.update, fd);
        }

        function last(data) {
            return http.get(
                url.task.last,
                {},
                true,
                true
            )
        }

        function subtasks(id) {
            return http.get(
                url.subtask.all,
                {
                    task_id: id
                },
                true
            );
        }
    }
})();
