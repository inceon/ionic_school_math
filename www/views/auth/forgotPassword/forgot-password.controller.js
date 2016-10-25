;(function () {
    'use strict';
    angular
        .module('app')
        .controller('ResetPassword', ResetPassword);

    ResetPassword.$inject = ['user'];

    function ResetPassword(user) {

        var vm = this;

        vm.resetData = {};
        vm.reset = reset;

        function reset() {
            user.reset(vm.resetData);
        }
    }
})();
