;(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                // var baseUrl = 'http://192.168.1.37/api/web/v2/';
                var baseUrl = 'http://school.apes-at-work.com/api/web/v2/';
                return {

                    user: {
                        one:         baseUrl + 'user/one',
                        token:       baseUrl + 'site/login-key',
                        login:       baseUrl + 'site/login',
                        reset:       baseUrl + 'site/forgot-password',
                        signup:      baseUrl + 'site/signup',
                        update:      baseUrl + 'user/update',
                        todo:        baseUrl + 'user/todo'
                    },
                    site: {
                        getLabels:   baseUrl + 'site/get-labels',
                        getInform:   baseUrl + 'site/get-inform'
                    },
                    discipline: {
                        one:         baseUrl + 'discipline/one',
                        all:         baseUrl + 'discipline/all',
                        books:       baseUrl + 'book-discipline/all',
                        myBook:      baseUrl + 'my-book/all'
                    },
                    book: {
                        sections:    baseUrl + 'section/all',
                        themes:      baseUrl + 'theme/all',
                        create:      baseUrl + 'my-book/create',
                    },
                    task: {
                        all:         baseUrl + 'task/all',
                        one:         baseUrl + 'task/one',
                        answer:      baseUrl + 'done-task/create',
                        update:      baseUrl + 'done-task/update',
                        last:        baseUrl + 'bookmark/for-user'
                    },
                    subtask: {
                        all:         baseUrl + 'subtask/all'
                    },
                    comment: {
                        add:        baseUrl + 'comment/create',
                        all:        baseUrl + 'comment/all',
                        message:    baseUrl + 'comment/all-message'
                    }
                };
            }
        ]);
})();