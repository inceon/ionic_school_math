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
        vm.changeForm = changeForm;
        vm.askForm = false;
        vm.messages = [
            {id:1, text:"Did you get my message, the one I left"},
            {id:1, text:"While I was trying to convince everything"},
            {id:2, text:"That I meant in a minute or less when I called to confess"},
            {id:1, text:"And make all of my stresses go bye-bye"},
            {id:2, text:"Did you get my message, you did not guess"},
            {id:1, text:"Cause if you did you would have called me with your sweet intent"},
            {id:2, text:"And we could give it a rest"},
            {id:2, text:"stead of beating my breast"},
            {id:1, text:"Making all of the pressure go sky-high"},
            {id:1, text:"Do you ever wonder what happens to the words that we send"},
            {id:2, text:"Do they bend, do they break from the flight that they take"},
        ];

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

        function changeForm() {
            vm.askForm = !vm.askForm;
            vm.label.result = vm.askForm ? "Задати питання" : "Відповідь";
        }

    }
})();
