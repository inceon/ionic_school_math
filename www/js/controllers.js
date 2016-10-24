angular.module('starter.controllers', [])

    .controller('DashCtrl', function ($scope) {
    })

    .controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    })

    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats, toastr, http, $sessionStorage, $rootScope) {
        $scope.chat = Chats.get($stateParams.chatId);
        toastr.success('Hello world!', 'Toastr fun!');
        var a = 'http://school-maths/api/web/v1/site/login';

        function get() {
            http.post(
                a,
                {
                    phone: '1111111111',
                    password: '11111111'
                },
                function (response) {
                    $sessionStorage.auth_key = response.user['auth_key'];
                    //if (data.isRememberMe) {
                    //    $localStorage.auth_key = response.user['auth_key'];
                    //}
                    delete response.user['auth_key'];
                    $rootScope.user = response.user;
                    $rootScope.isLogged = true;

                }
            );
        }
        get();
    })

    .controller('AccountCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
