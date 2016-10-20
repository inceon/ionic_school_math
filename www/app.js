;
(function() {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'services.module',
            'directives.module',
            'factory.module'
        ])
        .run(runBlock);

    runBlock.$inject = ['$ionicPlatform'];

    function runBlock($ionicPlatform) {
            $ionicPlatform.ready(function() {
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
            });
        }
})();
