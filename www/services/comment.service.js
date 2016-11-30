;(function () {
    'use strict';

    angular
        .module('model.comment', [])
        .service('comment', comment);

    comment.$inject = ['http', 'url'];
    function comment(http, url) {

        return {
            add: add,
            all: all,
            message: message
        };

        function add (data) {
            return http.post(
                url.comment.add,
                data
            )
        }

        function all (id) {
            return http.get(
                url.comment.all,
                {
                    task_id: id
                }
            )
        }

        function message (id) {
            return http.get(
                url.comment.message,
                {
                    comment_id: id
                }
            )
        }
    }
})();
