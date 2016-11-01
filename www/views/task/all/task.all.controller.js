;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Tasks', Tasks);

    Tasks.$inject = ['$stateParams', 'task'];

    function Tasks($stateParams, task) {

        var vm = this;

        vm.tasks = null;
        vm.themeId = $stateParams.themeId;

        task.all(vm.themeId)
            .then(function(response){
                vm.tasks = response.models;
            });

    }
})();
