;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Task', Task);

    Task.$inject = ['$rootScope', '$scope', '$stateParams', '$q', 'chats', 'subtasks', '$timeout', 'task', 'prepGetLabels', 'taskInfo', 'toastr', '$ionicModal', '$ionicPopup', 'comment', 'Upload', '$ionicLoading', 'purchase'];

    function Task($rootScope, $scope, $stateParams, $q, chats, subtasks, $timeout, task, prepGetLabels, taskInfo, toastr, $ionicModal, $ionicPopup, comment, Upload, $ionicLoading, purchase) {

        $rootScope.page = {
            title: 'Завдання'
        };

        var vm = this;

        vm.label = prepGetLabels.label;

        vm.submit = submit;
        vm.chats = chats.models;
        vm.task = taskInfo;
        vm.subtasks = subtasks.models;
        console.log(vm.subtasks);
        vm.upload = upload;
        vm.question = question;
        vm.openChat = openChat;
        // vm.audio = audio;
        vm.hideLoader = $ionicLoading.hide;
        vm.doRefresh = doRefresh;
        vm.loadMyChat = loadMyChat;
        vm.showAnswerModal = showAnswerModal;
        vm.closeAnswerModal = closeAnswerModal;
        vm.checkOrder = checkOrder;
        vm.messages = [];

        vm.data = vm.task.done || {};
        vm.data.task_id = $stateParams.taskId;

        vm.audio = {};

        vm.audio.stop = function () {
            window.plugins.audioRecorderAPI.stop(function (msg) {
                // alert("audio.stop: " + msg);
                $scope.$apply(function () {
                    vm.audio.data = msg;
                    vm.audio.online = false;
                });
                console.log("stop success");
            }, function (msg) {
                vm.audio.data = null;
                vm.audio.online = false;
                console.log("stop error");
            });
        };

        vm.audio.record = function () {
            vm.audio.online = true;
            window.plugins.audioRecorderAPI.record(function (msg) {
                $scope.$apply(function () {
                    vm.audio.data = msg;
                    vm.audio.online = false;
                });
                console.log("record success");
            }, function (msg) {
                vm.audio.data = null;
                vm.audio.online = false;
                console.log("record error");
            }, 100);
        };

        if (vm.chats) {
            angular.forEach(vm.chats, function (chat) {
                if (chat.created_by == $rootScope.user.id) {
                    vm.comment_id = chat.id;
                    vm.data.my_chat = chat;
                    comment.message(vm.comment_id)
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
            if (vm.data.created_by) {
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
            this.checkOrder()
                .then(function(){
                    if (vm.comment_id) {
                        vm.data.send_to = vm.comment_id;
                    }
                    if (vm.audio.data) {
                        vm.data.audio = vm.audio.data;

                        comment.addAudio(vm.data)
                            .then(function (response) {
                                vm.messages.push(response);
                                toastr.success("Повідомлення успішно відправлено");
                                vm.data.text = ' ';
                                delete vm.audio.data;
                            });
                    } else {
                        if (form.$invalid) {
                            toastr.error("Дані введені не вірно");
                            return;
                        }
                        comment.add(vm.data)
                            .then(function (response) {
                                response.role = $rootScope.user.role_id;
                                vm.messages.push(response);
                                toastr.success("Повідомлення успішно відправлено");
                                vm.data.text = ' ';
                            });
                    }
                }, function () {
                    $ionicPopup.show({
                        title: 'Підписка дозволяє задавати питання репетитору',
                        template: '',
                        scope: $scope,
                        cssClass: "popup-vertical-buttons",
                        buttons: [
                            {
                                text: 'Підписатися',
                                type: 'button-positive',
                                onTap: function (e) {
                                    return purchase.buy("onemonthsubscription");
                                }
                            },
                            {
                                text: 'Відмінити',
                                type: 'button-default',
                            }
                        ]
                    });
                });
        }

        function openChat(data) {
            if (data.id) {
                vm.comment_id = data.id;
                vm.data.send_to = data.created_by;
                vm.data.text = ' ';
                delete vm.audio.data;
                comment.message(data.id)
                    .then(function (response) {
                        vm.messages = response.models;
                        $scope.chatModal.show();
                    });
            }
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

        function loadMyChat() {
            if (vm.data.my_chat) {
                vm.comment_id = vm.data.my_chat.id;
                comment.message(vm.data.my_chat.id)
                    .then(function (response) {
                        vm.messages = response.models;
                    });
            } else {
                vm.messages = [];
            }
        }

        function showAnswerModal(subtask) {
            vm.data = subtask.done || {};
            vm.data.subtask_id = subtask.id;
            vm.data.task_id = $stateParams.taskId;
            console.log(vm.data);
            $scope.answerModal.show();
        }

        function closeAnswerModal(){
            task.subtasks($stateParams.taskId)
                .then(function(response){
                    vm.subtasks = response.models;
                    vm.subtask = null;
                    $scope.answerModal.hide();
                });
        }

        function checkOrder() {
            return purchase.checkSubscription()
                    .then(function(data){
                        if(data){
                            console.log(data);
                            return true
                        } else {
                            throw "Not order";
                        }
                    });
        }

        $scope.showImages = function (file) {
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
        };

        function doRefresh() {
            if (vm.chats) {
                comment.message(vm.comment_id)
                    .then(function (response) {
                        vm.messages = response.models;
                    });
            }
        }
    }
})();
