;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Task', Task);

    Task.$inject = ['$rootScope', '$stateParams', 'task', 'prepGetLabels', 'taskInfo'];

    function Task($rootScope, $stateParams, task, prepGetLabels, taskInfo) {

        $rootScope.page = {
            title: 'Task '
        };

        var vm = this;

        vm.label = prepGetLabels.label;

        vm.task = null;
        vm.taskId = $stateParams.taskId;

        vm.submit = answer;

        vm.task = taskInfo;
        $rootScope.page.task += vm.task.text;
        vm.data = vm.task.done;
        if (vm.data) {
            vm.submit = update;
        } else {
            vm.submit = answer;
        }
        // vm.data.task_id = vm.taskId;

        function update (){
            task.update(vm.data);
        }

        function answer() {
            task.answer(vm.data);
        }

    }
})();
