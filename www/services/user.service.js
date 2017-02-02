;(function () {
    'use strict';

    angular
        .module('model.user', [])
        .service('user', user);

    user.$inject = ['http', 'url', '$rootScope', '$sessionStorage', '$state', '$localStorage'];
    function user(http, url, $rootScope, $sessionStorage, $state, $localStorage) {

        return {
            one: one,
            get: get,
            login: login,
            register: register,
            reset: reset,
            logout: logout,
            update: update,
            todo: todo,
            subscription: subscription
        };

        function one(id) {
            return http.get(
                url.user.one,
                {
                    id: id
                }
            )
        }

        function login(data) {
            var remember = data.remember;
            return http.post(url.site.login, data)
                .then(function (response) {
                    if (remember) {
                        $localStorage.auth_key = response.user.auth_key;
                    }
                    $sessionStorage.auth_key = response.user.auth_key;
                    $rootScope.user = response.user;
                    $state.go('app.discipline.all');
                });
        }

        function get() {
            return http.get(
                url.site.token,
                {}
            );
        }

        function register(data){
            return http.post(url.site.signup, data)
                .then(function (response) {
                    $localStorage.auth_key = response.auth_key;
                    $sessionStorage.auth_key = response.auth_key;
                    $rootScope.user = response.user;
                    $rootScope.user.auth_key = response.auth_key;
                    $state.go('app.discipline.all');
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
                url.site.reset,
                data
            ).then(function(response){
                $state.go('login');
            });
        }

        function update(data) {
            return http.post(
                url.user.update,
                data
            )
        }

        function todo() {
            return http.get(
                url.user.todo,
                {},
                true,
                true
            );
        }

        function subscription(data) {
            return http.post(
                url.subscription.create,
                data
            );
        }
    }

})();
