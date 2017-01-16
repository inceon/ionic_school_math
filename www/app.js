;(function () {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'services.module',
            'directives.module',
            'filters.module',
            'factories.module'
        ])
        .run(runBlock);
    runBlock.$inject = ['$ionicPlatform', '$localStorage', '$sessionStorage', 'purchase', 'user', '$rootScope', '$state', 'toastr', '$ionicLoading'];
    function runBlock($ionicPlatform, $localStorage, $sessionStorage, purchase, user, $rootScope, $state, toastr, $ionicLoading) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }

            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            purchase.initialize();
            console.log("app.run");

            // nonRenewing.initialize({
            //     verbosity: store.DEBUG,
            //     products: [{
            //         id: 'cc.fovea.purchase.nonrenewing.1hour',
            //         duration: 3600
            //     }, {
            //         id: 'cc.fovea.purchase.nonrenewing.5minutes',
            //         duration: 300
            //     }]
            // });

            if ($localStorage.auth_key) {
                $sessionStorage.auth_key = $localStorage.auth_key;
            }
            if ($sessionStorage.auth_key) {
                user.get()
                    .then(function (response) {
                        $rootScope.user = response.user;
                    });
                $state.go('app.discipline.all');
            } else {
                $state.go('login');
            }
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams, options){
                    $ionicLoading.show({
                        templateUrl: 'views/lazyload/lazyload.html',
                        duration: 2000
                    });
                });
            $rootScope.$on('$stateChangeSuccess',
                function(event, toState, toParams, fromState, fromParams){
                    $ionicLoading.hide();
                })
        });

    }
})();
