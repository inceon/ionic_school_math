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
        vm.about = about;
        vm.discipline = discipline;

        function logout () {
            user.logout();
        }

        function discipline() {
            $state.go('app.discipline.all');
        }

        function settings() {
            $state.go('app.settings');
        }

        function about() {
            $state.go('app.about');
        }

    }

})();
