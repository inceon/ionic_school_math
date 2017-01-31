;(function () {
    "use strict";
    angular
        .module('app')
        .controller('LeftMenu', LeftMenu);

    LeftMenu.$inject = ['$rootScope', 'user', '$state', '$ionicHistory', '$ionicSideMenuDelegate'];

    function LeftMenu ($rootScope, user, $state, $ionicHistory, $ionicSideMenuDelegate) {

        var vm = this;

        $ionicSideMenuDelegate.canDragContent(false);

        vm.logout = logout;
        vm.settings = settings;
        vm.premium = premium;
        vm.discipline = discipline;

        function logout () {
            user.logout();
        }

        function discipline() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.discipline.all',{},{location:'replace'});
        }

        function settings() {
            $state.go('app.settings');
        }

        function premium() {
            $state.go('app.premium');
        }

    }

})();
