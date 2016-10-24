;(function () {
    'use strict';
    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['auth'];

    function Login(auth) {

        var vm = this;

        vm.login = login;
        vm.authData = {};

        function login() {
            auth.login(vm.authData);
        }
    }
})();