;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Disciplines', Disciplines);

    Disciplines.$inject = ['$rootScope', 'allDiscipline', '$state', 'todo'];

    function Disciplines($rootScope, allDiscipline, $state, todo) {

        $rootScope.page = {
            title: 'Disciplines'
        };

        var vm = this;

        vm.todo = todo;
        vm.disciplines = allDiscipline.models;
    }
})();
