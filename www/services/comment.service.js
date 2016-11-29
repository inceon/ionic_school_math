;(function () {
    'use strict';

    angular
        .module('model.comment', [])
        .service('comment', comment);

    comment.$inject = ['http', 'url'];
    function comment(http, url) {

        return {
            add: add,
            all: all
        };

        function add (data) {
            return http.post(
                url.comment.add,
                data
            )
        }

        function all (data) {
            return http.get(
                url.comment.all,
                data 
                /*
                    * adress_to if teacher
                    * task_id
                */
            )
        }
    }
})();
