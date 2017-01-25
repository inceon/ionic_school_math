;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Tasks', Tasks);

    Tasks.$inject = ['$rootScope', 'allTasks', 'allTheory', 'task'];

    function Tasks($rootScope, allTasks, allTheory, task) {

        $rootScope.page = {
            title: 'Завдання'
        };

        var vm = this;

        vm.tasks = allTasks.models;
        vm.theory = allTheory.models;

    }
})();
