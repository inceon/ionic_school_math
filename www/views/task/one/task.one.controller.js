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
        vm.loadMyChat = loadMyChat;
        vm.messages = [];

        vm.data = vm.task.done || {};
        vm.data.task_id = $stateParams.taskId;

        if (vm.chats) {
            angular.forEach(vm.chats, function(chat){
               if(chat.created_by == $rootScope.user.id){
                   vm.data.comment_id = chat.id;
                   vm.data.my_chat = chat;
                   comment.message(vm.data.comment_id)
                       .then(function (response) {
                           vm.messages = response.models;
                       });
               }
            });
        }

        function submit(form) {
            if (form.$invalid) {
                toastr.error("Дані введені не вірно");
                return;
            }
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
            vm.data.attach = $files;

            angular.forEach($files, function (file) {
                vm.data[file.lastModified] = file;
            });
            console.log(vm.data);
        }

        function question(form) {
            if (form.$invalid) {
                toastr.error("Дані введені не вірно");
                return;
            }
            if (vm.data.comment_id) {
                vm.data.send_to = vm.data.comment_id;
            }
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

        $scope.deleteAttach = function (file) {
            delete vm.data[file.lastModified];
        };

        function loadMyChat(){
            if(vm.data.my_chat) {
                vm.data.comment_id = vm.data.my_chat.id;
                comment.message(vm.data.my_chat.id)
                    .then(function (response) {
                        vm.messages = response.models;
                    });
            }
        }

        $scope.showImages = function (file) {
            // $ionicLoading.show({templateUrl: 'views/lazyload/lazyload.html'});
            $ionicModal.fromTemplateUrl('views/task/one/popover/image.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.imagesModal = modal;
                $scope.imagesModal.file = file;
                $scope.imagesModal.show();
            });
        };

        $scope.closeModal = function () {
            $scope.imagesModal.hide();
            // $scope.modal.remove();
        };

        function doRefresh () {
            if (vm.chats) {
                comment.message(vm.data.comment_id)
                    .then(function (response) {
                        vm.messages = response.models;
                    });
            }
            $scope.$broadcast('scroll.refreshComplete');
        }

    }
})();
