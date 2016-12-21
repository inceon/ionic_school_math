;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Task', Task);

    Task.$inject = ['$rootScope', '$scope', '$stateParams', '$q', 'chats', '$ionicSlideBoxDelegate', '$timeout', 'task', 'prepGetLabels', 'taskInfo', 'toastr', '$ionicModal', '$ionicPopup', 'comment', 'Upload', '$ionicLoading'];

    function Task($rootScope, $scope, $stateParams, $q, chats, $ionicSlideBoxDelegate, $timeout, task, prepGetLabels, taskInfo, toastr, $ionicModal, $ionicPopup, comment, Upload, $ionicLoading) {

        $rootScope.page = {
            title: 'Завдання'
        };

        $scope.alert = function(){
            alert();
            $scope.$broadcast('scroll.refreshComplete');
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

        vm.audio = {};

        vm.audio.stop = function () {
            vm.audio.online = false;
            window.plugins.audioRecorderAPI.stop(function (msg) {
                // alert("audio.stop: " + msg);
                vm.audio.data = msg;
                $scope.apply();
            }, function (msg) {
                delete vm.audio.data;
            });
        };

        vm.audio.record = function () {
            vm.audio.online = true;
            window.plugins.audioRecorderAPI.record(function (msg) {
                vm.audio.online = false;
                vm.audio.data = msg;
                $scope.apply();
            }, function (msg) {
                delete vm.audio.data;
                vm.audio.online = false;

            }, 15);
        };

        if (vm.chats) {
            angular.forEach(vm.chats, function (chat) {
                if (chat.created_by == $rootScope.user.id) {
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
            if (vm.data.comment_id) {
                vm.data.send_to = vm.data.comment_id;
            }
            if (vm.audio.data) {
                vm.data.audio = vm.audio.data;

                comment.addAudio(vm.data)
                    .then(function (response) {
                        console.log(response);
                        vm.messages.push(response);
                        // response.role = $rootScope.user.role_id;
                        toastr.success("Повідомлення успішно відправлено");
                        // vm.data.text = '';
                        delete vm.data.audio;
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
                        delete vm.data.text;
                    });
            }
        }

        function openChat(data) {
            if (data.id) {
                vm.data.comment_id = data.id;
                vm.data.send_to = data.created_by;
                delete vm.data.text;
                delete vm.data.audio;
                delete vm.audio.data;
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

        function loadMyChat() {
            if (vm.data.my_chat) {
                vm.data.comment_id = vm.data.my_chat.id;
                comment.message(vm.data.my_chat.id)
                    .then(function (response) {
                        vm.messages = response.models;
                    });
            }
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
            var deferred = $q.defer();
            if (vm.chats) {
                comment.message(vm.data.comment_id)
                    .then(function (response) {
                        vm.messages = response.models;
                        deferred.resolve(true);
                    });
            } else {
                deferred.resolve(true);
            }
            return deferred.promise;
        }
    }
})();
