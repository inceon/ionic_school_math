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
            answer: answer
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

        function answer(data){
            return http.post(
                url.task.answer,
                data
            )
        }
    }
})();
