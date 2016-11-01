;(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                 // var baseUrl = 'http://192.168.0.112/api/web/v1/';
                 // var baseUrl = 'http://192.168.0.118/api/web/v1/';
                 var baseUrl = 'http://192.168.0.125/api/web/v2/';
                // var baseUrl = 'http://school-maths/api/web/v1/';
                return {

                    user: {
                        token:       baseUrl + 'site/login-key',
                        login:       baseUrl + 'site/login',
                        reset:       baseUrl + 'site/forgot-password',
                        signup:      baseUrl + 'site/signup'
                    },
                    site: {
                        getLabels:   baseUrl + 'site/get-labels',
                        getInform:   baseUrl + 'site/get-inform',
                    },
                    discipline: {
                        one:         baseUrl + 'discipline/one',
                        all:         baseUrl + 'discipline/all',
                        books:       baseUrl + 'book-discipline/all'
                    },
                    book: {
                        sections:    baseUrl + 'section/all',
                        themes:      baseUrl + 'theme/all',
                        tasks:       baseUrl + 'task/all',
                        task:        baseUrl + 'task/one',
                    }
                };
            }
        ]);
})();
