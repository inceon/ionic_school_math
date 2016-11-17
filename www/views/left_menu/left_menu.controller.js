;(function () {
    "use strict";
    angular
        .module('app')
        .controller('LeftMenu', LeftMenu);

    LeftMenu.$inject = ['$rootScope', 'user', '$state', '$ionicViewService'];

    function LeftMenu ($rootScope, user, $state, $ionicViewService) {

        var vm = this;

        vm.logout = logout;
        vm.settings = settings;
        vm.about = about;
        vm.discipline = discipline;

        function logout () {
            user.logout();
        }

        function discipline() {
            $ionicViewService.nextViewOptions({
                disableBack: true
            });
            $state.go('app.discipline.all',{},{location:'replace'});
        }

        function settings() {
            $state.go('app.settings');
        }

        function about() {
            $state.go('app.about');
        }

    }

})();
