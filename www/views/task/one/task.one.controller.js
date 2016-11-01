;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Task', Task);

    Task.$inject = ['$stateParams', 'book'];

    function Task($stateParams, book) {

        var vm = this;

        vm.tasks = null;
        vm.taskId = $stateParams.taskId;

        book.task.one(vm.taskId)
            .then(function(response){
                vm.task = response;
            });

    }
})();
