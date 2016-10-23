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
        .state('side-menu21.page1', {
            url: '/page1',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/page1.html',
                    controller: 'page1Ctrl'
                }
            }
        })

        .state('side-menu21.page2', {
            url: '/page2',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/page2.html',
                    controller: 'page2Ctrl'
                }
            }
        })

        .state('side-menu21.page3', {
            url: '/page3',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/page3.html',
                    controller: 'page3Ctrl'
                }
            }
        })

        .state('side-menu21', {
            url: '/side-menu21',
            templateUrl: 'templates/side-menu21.html',
            controller: 'side-menu21Ctrl'
        })

        .state('page4', {
            url: '/page4',
            templateUrl: 'templates/page4.html',
            controller: 'page4Ctrl'
        })

        .state('page6', {
            url: '/page6',
            templateUrl: 'templates/page6.html',
            controller: 'page6Ctrl'
        })

        .state('side-menu21.page8', {
            url: '/page8',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/page8.html',
                    controller: 'page8Ctrl'
                }
            }
        })

        .state('side-menu21.schoolMathPremium', {
            url: '/page9',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/schoolMathPremium.html',
                    controller: 'schoolMathPremiumCtrl'
                }
            }
        })

        .state('side-menu21.page10', {
            url: '/page10',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/page10.html',
                    controller: 'page10Ctrl'
                }
            }
        })

        .state('page11', {
            url: '/page11',
            templateUrl: 'templates/page11.html',
            controller: 'page11Ctrl'
        })

        .state('page12', {
            url: '/page12',
            templateUrl: 'templates/page12.html',
            controller: 'page12Ctrl'
        })

        .state('side-menu21.page13', {
            url: '/page13',
            views: {
                'side-menu21': {
                    templateUrl: 'templates/page13.html',
                    controller: 'page13Ctrl'
                }
            }
        })

        $urlRouterProvider.otherwise('/side-menu21/page1');


    }

})();

