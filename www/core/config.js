;(function () {
    'use strict';
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function mainConfig($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'views/auth/login/login.html',
                controller: 'Login',
                controllerAs: 'vm'
            })
            .state('qqq', {
                url: '/qqq',
                templateUrl: 'views/qqq/qqq.html',
                controller: 'QQQ',
                controllerAs: 'vm'
            })
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/dashboard.html',
                controller: 'Dashboard',
                controllerAs: 'vm',
                resolve: {
                    dashboardPrepService: function(auth) {
                        return auth.get();
                    }
                }
            });

        $urlRouterProvider.otherwise('/qqq');
    }


})();

