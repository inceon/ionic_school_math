;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Theory', Tasks);

    Tasks.$inject = ['$rootScope'];

    function Tasks($rootScope) {

        $rootScope.page = {
            title: 'Завдання'
        };

        var vm = this;

    }
})();
