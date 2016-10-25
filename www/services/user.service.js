;(function () {
    'use strict';

    angular
        .module('model.user', [])
        .service('user', user);

    user.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state'];
    function user(http, url, $rootScope, $sessionStorage, $state) {

        return {
            get: get,
            login: login,
            register: register,
            reset: reset
        };

        function login(data) {
            return http.post(url.user.login, data)
                .then(function (response) {
                    $sessionStorage.auth_key = response.user.auth_key;
                    //if (response.isRememberMe) { $localStorage.auth_key = response.user.auth_key; }
                    $rootScope.user = response.user;
                    $state.go('dashboard');
                });
        }

        function get() {
            return http.get(url.user.token, {});
        }

        function register(){
            return 0;
        }

        function reset(data) {
            return http.post(
                url.user.reset,
                data
            ).then(function(response){
                $state.go('login');
            });
        }
    }

})();
