;(function () {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'services.module',
            'directives.module',
            'request.module',
        ])
        .run(runBlock);

    function runBlock($ionicPlatform, $ionicHistory, $localStorage, $sessionStorage, user, $rootScope, $state, toastr) {
        $ionicPlatform.ready(function () {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            if ($localStorage.auth_key) {
                $sessionStorage.auth_key = $localStorage.auth_key;
            }
            if ($sessionStorage.auth_key) {
                //auth.get();
                $state.go('app.discipline.task({taskId: 27})');
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
        });

    }
})();
