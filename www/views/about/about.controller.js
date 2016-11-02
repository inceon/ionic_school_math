;(function () {
    "use strict";
    angular
        .module('app')
        .controller('About', About);

    About.$inject = ['$rootScope'];

    function About ($rootScope) {

        $rootScope.page = {
            title: 'Disciplines'
        };

        var vm = this;

    }

})();
