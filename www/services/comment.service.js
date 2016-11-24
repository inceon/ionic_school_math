;(function () {
    'use strict';

    angular
        .module('model.comment', [])
        .service('comment', comment);

    comment.$inject = ['http', 'url'];
    function comment(http, url) {

        return {
            add: add
        };

        function add (data) {
            return http.post(
                url.comment.add,
                data
            )
        }
    }
})();
