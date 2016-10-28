;(function () {
    "use strict";
    angular
        .module('app')
        .controller('LeftMenu', LeftMenu);

    LeftMenu.$inject = ['user'];

    function LeftMenu (user) {

        var vm = this;

        vm.logout = logout;

        function logout () {
            user.logout();
            console.log('regerg');
        }

    }

})();
