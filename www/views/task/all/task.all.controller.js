;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Tasks', Tasks);

    Tasks.$inject = ['$stateParams', 'book'];

    function Tasks($stateParams, book) {

        var vm = this;

        vm.tasks = null;
        vm.themeId = $stateParams.themeId;

        book.task.all(vm.themeId)
            .then(function(response){
                vm.tasks = response.models;
            });

    }
})();
