;(function () {
    "use strict";
    angular
        .module('app')
        .controller('LeftMenu', LeftMenu);

    LeftMenu.$inject = ['user', '$state'];

    function LeftMenu (user, $state) {

        var vm = this;

        vm.logout = logout;
        vm.settings = settings;

        function logout () {
            user.logout();
        }

        function settings() {
            $state.go('app.settings');
        }

    }

})();
