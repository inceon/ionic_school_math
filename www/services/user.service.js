;(function () {
    'use strict';

    angular
        .module('model.user', [])
        .service('user', user);

    user.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state', '$localStorage'];
    function user(http, url, $rootScope, $sessionStorage, $state, $localStorage) {

        return {
            get: get,
            login: login,
            register: register,
            reset: reset,
            logout: logout
        };

        function login(data) {
            var remember = data.remember;
            delete data.remember;
            return http.post(url.user.login, data)
                .then(function (response) {
                    if (remember) {
                        $localStorage.auth_key = response.user.auth_key;
                    }
                    $sessionStorage.auth_key = response.user.auth_key;
                    $rootScope.user = response.user;
                    $state.go('app.dashboard');
                });
        }

        function get() {
            return http.get(url.user.token, {});
        }

        function register(data){
            return http.post(url.user.signup, data)
                .then(function (response) {
                    console.log(response);
                });
        }

        function logout() {
            delete $rootScope.user;
            delete $sessionStorage.auth_key;
            delete $localStorage.auth_key;
            $state.go('login');
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
