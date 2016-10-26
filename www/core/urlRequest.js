;(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                 var baseUrl = 'http://192.168.0.112/api/web/v1/';
                //var baseUrl = 'http://school-maths/api/web/v1/';
                return {

                    user: {
                        token:       baseUrl + 'site/login-key',
                        login:       baseUrl + 'site/login',
                        reset:       baseUrl + 'site/forgot-password'
                    },
                    site: {
                        getLabels:   baseUrl + 'site/get-labels',
                        getInform:   baseUrl + 'site/get-inform',
                    },
                    discipline: {
                        one:         baseUrl + 'discipline/one',
                        all:         baseUrl + 'discipline/all',
                    }
                };
            }
        ]);
})();
