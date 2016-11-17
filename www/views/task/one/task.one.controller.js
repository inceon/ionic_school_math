;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Task', Task);

    Task.$inject = ['$rootScope', '$stateParams', 'task', 'prepGetLabels', 'taskInfo', 'toastr', '$ionicPopup'];

    function Task($rootScope, $stateParams, task, prepGetLabels, taskInfo, toastr, $ionicPopup) {

        $rootScope.page = {
            title: 'Завдання'
        };

        var vm = this;

        vm.label = prepGetLabels.label;

        vm.submit = answer;
        vm.task = taskInfo;
        vm.upload = upload;
        vm.question = question;

        vm.data = vm.task.done || {};
        if (vm.task.done) {
            vm.submit = update;
        } else {
            vm.submit = answer;
        }
        vm.data.task_id = $stateParams.taskId;

        function update (){
            task.update(vm.data)
                .then(function(){
                    toastr.success("Відповідь успішно оновлена");
                });
        }

        function answer() {
            task.answer(vm.data)
                .then(function(){
                    toastr.success("Відповідь успішно відправлена");
                });
        }

        function upload($file) {
            console.log($file);
        }

        function question() {
            var alertPopup = $ionicPopup.confirm({
                title: 'Ця функція доступна тільки для School Math Premium!',
                template: 'Зняти обмеження?',
                buttons: [{
                    text: 'Так',
                    type: 'button-positive',
                    onTap: function() {
                        return 'OK';
                    }
                },
                {
                    text: 'Ні',
                    type: 'button-default'
                }]
            });
            alertPopup.then(function(res) {
                if(res) {
                    console.log('Deleted !');
                } else {
                    console.log('Deletion canceled !');
                }
            });
        }

    }
})();
