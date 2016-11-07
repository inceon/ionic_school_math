;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Tasks', Tasks);

    Tasks.$inject = ['$rootScope', 'allTasks', 'task'];

    function Tasks($rootScope, allTasks, task) {

        $rootScope.page = {
            title: 'Tasks'
        };

        var vm = this;

        vm.tasks = allTasks.models;

    }
})();
