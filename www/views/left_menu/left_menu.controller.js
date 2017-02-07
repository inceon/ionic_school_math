;(function () {
    "use strict";
    angular
        .module('app')
        .controller('LeftMenu', LeftMenu);

    LeftMenu.$inject = ['$rootScope', 'user', '$state', '$ionicHistory', '$scope'];

    function LeftMenu($rootScope, user, $state, $ionicHistory, $scope) {

        var vm = this;

        vm.logout = logout;
        vm.settings = settings;
        vm.premium = premium;
        vm.discipline = discipline;
        vm.myGoBack = back;

        function logout() {
            user.logout();
        }

        function discipline() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.discipline.all', {}, {location: 'replace'});
        }

        function settings() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.settings');
        }

        function premium() {
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('app.premium');
        }

        function back() {
            $ionicHistory.goBack();
        }


    }

})();
