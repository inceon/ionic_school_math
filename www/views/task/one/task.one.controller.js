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
        vm.openChat = openChat;
        // vm.audio = audio;
        vm.hideLoader = $ionicLoading.hide;
        vm.doRefresh = doRefresh;
        vm.messages = [];

        vm.data = vm.task.done || {};
        vm.data.task_id = $stateParams.taskId;

        if (vm.chats) {
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
            console.log($files);
            // vm.data.files = $files;

            angular.forEach($files, function (file) {
                vm.data[file.lastModified] = file;
                vm.data.files.push(file);
            });
            console.log(vm.data);
        }

        function question() {
            // if (vm.chats.length && vm.chats[0].id) {
            //     vm.data.comment_id = vm.chats[0].id;
            // }
            comment.add(vm.data)
                .then(function (response) {
                    response.role = $rootScope.user.role_id;
                    vm.messages.push(response);
                    toastr.success("Повідомлення успішно відправлено");
                    vm.data.text = ' ';
                });
        }

        function openChat(data) {
            if(data.id) {
                vm.data.comment_id = data.id;
                vm.data.send_to = data.created_by;
                comment.message(data.id)
                    .then(function (response) {
                        vm.messages = response.models;
                    });
            }
            $scope.chatModal.show();
        }

        $ionicModal.fromTemplateUrl('views/task/one/modal-answer.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.answerModal = modal;
        });

        $ionicModal.fromTemplateUrl('views/task/one/modal-chat.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.chatModal = modal;
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
            if (vm.chats) {
                comment.message(vm.chats[0].id)
                    .then(function (response) {
                        vm.messages = response.models;
                    });
            }
            $rootScope.$broadcast('scroll.refreshComplete');
        }

    }
})();
