;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Disciplines', Disciplines);

    Disciplines.$inject = ['$rootScope', 'allDiscipline', '$state'];

    function Disciplines($rootScope, allDiscipline, $state) {

        $rootScope.page = {
            title: 'Disciplines'
        };

        var vm = this;

        vm.disciplines = allDiscipline.models;
    }
})();
