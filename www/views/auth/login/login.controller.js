;(function () {
    'use strict';
    angular
        .module('app')
        .controller('Login', Login);

    Login.$inject = ['user', 'prepGetLabels'];

    function Login(user, prepGetLabels) {

        var vm = this;

        vm.login = login;
        vm.authData = {
            phone: '',
            password: ''
        };
        vm.label = prepGetLabels.label;

        function login() {
            user.login(vm.authData);
        }
    }
})();
