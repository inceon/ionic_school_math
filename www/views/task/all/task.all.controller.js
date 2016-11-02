;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Tasks', Tasks);

    Tasks.$inject = ['$rootScope', '$stateParams', 'task'];

    function Tasks($rootScope, $stateParams, task) {

        $rootScope.page = {
            title: 'Tasks'
        };

        var vm = this;

        vm.tasks = null;
        vm.themeId = $stateParams.themeId;

        task.all(vm.themeId)
            .then(function(response){
                vm.tasks = response.models;
            });

    }
})();
