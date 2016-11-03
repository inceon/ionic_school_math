;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Task', Task);

    Task.$inject = ['$rootScope', '$stateParams', 'task', 'prepGetLabels'];

    function Task($rootScope, $stateParams, task, prepGetLabels) {

        $rootScope.page = {
            title: 'Task '
        };

        var vm = this;

        vm.label = prepGetLabels.label;

        vm.task = null;
        vm.taskId = $stateParams.taskId;

        vm.submit = answer;

        task.one(vm.taskId)
            .then(function(response){
                vm.task = response;
                $rootScope.page.task += vm.task.text;
                vm.data = vm.task.done;
                vm.submit = (vm.data ? update : answer);
                console.log(vm);
                vm.data.task_id = vm.taskId;
            });

        function update (){
            task.update(vm.data);
        }

        function answer() {
            task.answer(vm.data);
        }

    }
})();
