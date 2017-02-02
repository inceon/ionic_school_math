(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                var baseUrl = 'http://192.168.1.53/api/web/v2/';
                // var baseUrl = 'http://192.168.0.130/api/web/v2/';
                // var baseUrl = 'http://school.apes-at-work.com/api/web/v2/';
                return {

                    user: {
                        one:         baseUrl + 'user/one',
                        update:      baseUrl + 'user/update',
                        todo:        baseUrl + 'user/todo',
                    },
                    site: {
                        getLabels:   baseUrl + 'site/get-labels',
                        getInform:   baseUrl + 'site/get-inform',
                        token:       baseUrl + 'site/login-key',
                        signup:      baseUrl + 'site/signup',
                        login:       baseUrl + 'site/login',
                        reset:       baseUrl + 'site/forgot-password',
                        check:       baseUrl + 'site/check',
                    },
                    discipline: {
                        all:         baseUrl + 'discipline/all',
                        books:       baseUrl + 'book-discipline/all',
                        myBook:      baseUrl + 'my-book/all'
                    },
                    book: {
                        sections:    baseUrl + 'section/all',
                        themes:      baseUrl + 'theme/all',
                    },
                    myBook: {
                        create:      baseUrl + 'my-book/create',
                        update:      baseUrl + 'my-book/update',
                    },
                    task: {
                        all:         baseUrl + 'task/all',
                        one:         baseUrl + 'task/one',
                        last:        baseUrl + 'bookmark/for-user'
                    },
                    doneTask: {
                        answer:      baseUrl + 'done-task/create',
                        update:      baseUrl + 'done-task/update',
                    },
                    theory: {
                        all:         baseUrl + 'theory/all',
                        one:         baseUrl + 'theory/one'
                    },
                    subtask: {
                        all:         baseUrl + 'subtask/all'
                    },
                    comment: {
                        add:        baseUrl + 'comment/create',
                        all:        baseUrl + 'comment/all',
                        message:    baseUrl + 'comment/all-message'
                    },
                    subscription: {
                        create:     baseUrl + 'subscription/create'
                    }
                };
            }
        ]);
})();
