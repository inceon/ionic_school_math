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
            phone: '1234567936',
            // phone: '1111111111',
            // phone: '1111111115',
            password: '11111111'
        };
        // vm.authData = null;

        vm.label = prepGetLabels.label;

        function login(form) {
            if (form.$invalid) { return; }
            user.login(vm.authData);
        }
    }
})();
