;(function () {
    'use strict';
    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['user'];

    function Login(user) {

        var vm = this;

        vm.login = login;
        vm.authData = {};

        function login() {
            user.login(vm.authData);
        }
    }
})();
