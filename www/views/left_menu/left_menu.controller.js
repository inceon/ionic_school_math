;(function () {
    "use strict";
    angular
        .module('app')
        .controller('LeftMenu', LeftMenu);

    LeftMenu.$inject = ['$rootScope', 'user', '$state', '$ionicHistory'];

    function LeftMenu ($rootScope, user, $state, $ionicHistory) {

        var vm = this;

        vm.logout = logout;
        vm.settings = settings;
        vm.about = about;
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

        function about() {
            $state.go('app.about');
        }

    }

})();
