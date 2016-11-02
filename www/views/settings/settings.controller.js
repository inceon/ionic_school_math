;(function () {
    "use strict";
    angular
        .module('app')
        .controller('Settings', Settings);

    Settings.$inject = ['$rootScope', 'user'];

    function Settings ($rootScope, user) {

        $rootScope.page = {
            title: 'Setting'
        };

        var vm = this;

    }

})();
