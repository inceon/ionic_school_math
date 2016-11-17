;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Task', Task);

    Task.$inject = ['$rootScope', '$stateParams', 'task', 'prepGetLabels', 'taskInfo'];

    function Task($rootScope, $stateParams, task, prepGetLabels, taskInfo) {

        $rootScope.page = {
            title: 'Завдання'
        };

        var vm = this;

        vm.label = prepGetLabels.label;

        vm.submit = answer;
        vm.task = taskInfo;
        vm.upload = upload;

        vm.data = vm.task.done || {};
        if (vm.task.done) {
            vm.submit = update;
        } else {
            vm.submit = answer;
        }
        vm.data.task_id = $stateParams.taskId;

        function update (){
            task.update(vm.data);
        }

        function answer() {
            task.answer(vm.data);
        }

        function upload($file) {
            console.log($file);
        }

    }
})();
