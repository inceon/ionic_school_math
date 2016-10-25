;(function () {
    'use strict';
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function mainConfig($stateProvider, $urlRouterProvider ) {

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
            .state('registration', {
                url: '/registration',
                templateUrl: 'views/auth/registration/registration.html',
                controller: 'Registration',
                controllerAs: 'vm',
                resolve: {
                    prepGetLabels: function(site) {
                        return site.getLabels('user');
                    },
                    prepDisciplineAll: function(discipline) {
                        return discipline.all();
                    }
                }
            })
            .state('forgotPassword', {
                url: '/reset-password',
                templateUrl: 'views/auth/forgotPassword/forgot-password.html',
                controller: 'ResetPassword',
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
                    dashboardPrepService: function(user) {
                        return user.get();
                    }
                }
            });

        $urlRouterProvider.otherwise('/qqq');
    }


})();

