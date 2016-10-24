;(function () {
    'use strict';

    angular
        .module('model.auth', [])
        .service('auth', auth);

    auth.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state'];
    function auth(http, url, $rootScope, $sessionStorage, $state) {

        return {
            get: get,
            login: login
        };

        function login(data) {
           return http.post(url.auth.login, data)
                .then(function (response) {
                    $sessionStorage.auth_key = response.user.auth_key;
                    //if (response.isRememberMe) { $localStorage.auth_key = response.user.auth_key; }
                    $rootScope.user = response.user;
                    $state.go('dashboard');
                });
        }

        function get() {
            return http.get(url.auth.token, {});
        }
    }

})();