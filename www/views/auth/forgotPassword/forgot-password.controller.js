;(function () {
    'use strict';
    angular
        .module('app')
        .controller('ResetPassword', ResetPassword);

    ResetPassword.$inject = ['user', 'prepGetLabels'];

    function ResetPassword(user, prepGetLabels) {

        var vm = this;

        vm.resetData = {};
        vm.reset = reset;
        vm.label = prepGetLabels.label;

        function reset(form) {
            if (form.$invalid) { return; }
            user.reset(vm.resetData);
        }
    }
})();
