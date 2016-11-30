;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Task', Task);

    Task.$inject = ['$rootScope', '$scope', '$stateParams', 'chats', '$ionicSlideBoxDelegate', 'task', 'prepGetLabels', 'taskInfo', 'toastr', '$ionicModal', '$ionicPopup', 'comment', 'Upload', '$ionicLoading'];

    function Task($rootScope, $scope, $stateParams, chats, $ionicSlideBoxDelegate, task, prepGetLabels, taskInfo, toastr, $ionicModal, $ionicPopup, comment, Upload, $ionicLoading) {

        $rootScope.page = {
            title: 'Завдання'
        };

        var vm = this;

        vm.label = prepGetLabels.label;

        vm.submit = submit;
        vm.chats = chats.models;
        vm.task = taskInfo;
        vm.upload = upload;
        vm.question = question;
        vm.showChat = showChat;
        // vm.audio = audio;
        vm.hideLoader = $ionicLoading.hide;
        vm.doRefresh = doRefresh;

        vm.data = vm.task.done || {};
        vm.data.task_id = $stateParams.taskId;

        if (vm.chats.length) {
            comment.message(vm.chats[0].id)
                .then(function (response) {
                    vm.messages = response.models;
                });
        }

        function submit() {
            if (vm.task.done) {
                task.update(vm.data)
                    .then(function () {
                        toastr.success("Відповідь успішно оновлена");
                    });
            } else {
                task.answer(vm.data)
                    .then(function () {
                        toastr.success("Відповідь успішно відправлена");
                    });
            }
        }

        function upload($files) {
            // $ionicLoading.show({templateUrl: 'views/lazyload/lazyload.html'});
            console.log($files);
            vm.data.photo = $files;

            vm.data.extension = [];
            vm.data.image_file = [];
            angular.forEach($files, function (file) {
                vm.data.extension.push(file.type.split('/')[1]);
                Upload.base64DataUrl(file)
                    .then(function (base64) {
                        vm.data.image_file.push(base64.split(',', 2)[1]);
                    });
            });
            // $ionicLoading.hide();
        }

        function question() {
            if (vm.chats.length) {
                vm.data.comment_id = vm.chats[0].id;
            }
            comment.add(vm.data)
                .then(function (response) {
                    response.role = $rootScope.user.role_id;
                    vm.messages.push(response);
                    toastr.success("Повідомлення успішно відправлено");
                    vm.data.text = ' ';
                });
        }

        function showChat(chat) {
            if (chat.show) {
                chat.show = false;
            } else {
                chat.show = true;
            }
        }

        $ionicModal.fromTemplateUrl('modal-answer.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.answerModal = modal;
        });

        $scope.deleteAttach = function (index) {
            vm.data.photo.splice(index, 1);
            vm.data.extension.splice(index, 1);
            vm.data.image_file.splice(index, 1);
            $ionicSlideBoxDelegate.update();
        };

        $scope.showImages = function (index) {
            $scope.activeSlide = index;
            $scope.showModal('views/task/one/popover/image.html');
        };

        $scope.showModal = function (templateUrl) {
            $ionicLoading.show({templateUrl: 'views/lazyload/lazyload.html'});
            $ionicModal.fromTemplateUrl(templateUrl, {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        };

        $scope.closeModal = function () {
            $scope.modal.hide();
            $scope.modal.remove()
        };

        function doRefresh() {
            // alert();
            vm.messages = [
                {id: 1, text: "And make all of my stresses go bye-bye"},
                {id: 2, text: "Did you get my message, you did not guess"},
                {id: 1, text: "Cause if you did you would have called me with your sweet intent"},
                {id: 2, text: "And we could give it a rest"},
                {id: 2, text: "stead of beating my breast"},
                {id: 1, text: "Making all of the pressure go sky-high"},
                {id: 1, text: "Do you ever wonder what happens to the words that we send"},
                {id: 2, text: "Do they bend, do they break from the flight that they take"},
            ];
            $rootScope.$broadcast('scroll.refreshComplete');
        }

    }
})();
