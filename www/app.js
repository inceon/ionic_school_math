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

    function runBlock($ionicPlatform, $ionicHistory, $localStorage, $sessionStorage, user, $rootScope, $state) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            if ($localStorage.auth_key) {
                $sessionStorage.auth_key = $localStorage.auth_key;
            }
            if ($sessionStorage.auth_key) {
                //auth.get();
                $state.go('dashboard');
            } else {
                $state.go('login');
            }
        });
    }
})();
