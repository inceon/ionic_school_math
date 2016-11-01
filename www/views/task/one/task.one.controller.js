;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Task', Task);

    Task.$inject = ['$stateParams', 'task', 'prepGetLabels'];

    function Task($stateParams, task, prepGetLabels) {

        var vm = this;

        vm.label = prepGetLabels.label;
        vm.answer = answer;

        vm.task = null;
        vm.taskId = $stateParams.taskId;

        task.one(vm.taskId)
            .then(function(response){
                vm.task = response;
            });

        function answer() {
            vm.data.task_id = vm.task.id;
            console.log(vm.task.id);
            task.answer(vm.data)
                .then(function(response){
                    vm.task = response;
                });

        }

    }
})();
