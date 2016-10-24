;(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                // var baseUrl = 'http://192.168.0.114/api/web/v1/';
                var baseUrl = 'http://school-maths/api/web/v1/';
                return {

                    auth: {
                        token:       baseUrl + 'site/login-key',
                        login:       baseUrl + 'site/login'
                    }
                };
            }
        ]);
})();