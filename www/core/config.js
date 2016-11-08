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
                controllerAs: 'vm',
                resolve: {
                    prepGetLabels: function(site) {
                        return site.getLabels('User');
                    }
                }
            })
            .state('registration', {
                url: '/registration',
                templateUrl: 'views/auth/registration/registration.html',
                controller: 'Registration',
                controllerAs: 'vm',
                resolve: {
                    prepGetLabels: function(site) {
                        return site.getLabels('User');
                    }
                }
            })
            .state('forgotPassword', {
                url: '/reset-password',
                templateUrl: 'views/auth/forgotPassword/forgot-password.html',
                controller: 'ResetPassword',
                controllerAs: 'vm',
                resolve: {
                    prepGetLabels: function(site) {
                        return site.getLabels('User');
                    }
                }
            })
            .state('qqq', {
                url: '/qqq',
                templateUrl: 'views/qqq/qqq.html',
                controller: 'QQQ',
                controllerAs: 'vm'
            })
            .state('app', {
                url: '/app',
                templateUrl: 'views/left_menu/left_menu.html',
                controller: 'LeftMenu',
                controllerAs: 'vm'
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'views/dashboard/dashboard.html',
                controller: 'Dashboard',
                controllerAs: 'vm',
                resolve: {
                    dashboardPrepService: function (user) {
                        return user.get();
                    }
                }
            })
            .state('app.discipline', {
                url: '/discipline/:disciplineId',
                template: "<ion-nav-view></ion-nav-view>",
                abstract: true
            })
            .state('app.discipline.all', {
                url: 'all',
                parent: 'app.discipline',
                templateUrl: 'views/discipline/all/all-discipline.html',
                controller: 'Disciplines',
                controllerAs: 'vm',
                resolve: {
                    allDiscipline: function (discipline) {
                        return discipline.all();
                    },
                    todo: function (user) {
                        return user.todo();
                    }
                }
            })
            .state('app.discipline.books', {
                url: '/books',
                templateUrl: 'views/discipline/books/books.html',
                controller: 'DisciplineBooks',
                controllerAs: 'vm',
                resolve: {
                    userBook: function (discipline, $stateParams) {
                        return discipline.myBook($stateParams.disciplineId);
                    },
                    allBooks: function (discipline, $stateParams) {
                        return discipline.books($stateParams.disciplineId);
                    }
                }
            })
            .state('app.discipline.book', {
                url: '/book/:bookId',
                templateUrl: 'views/sections/sections.html',
                controller: 'Sections',
                controllerAs: 'vm',
                resolve: {
                    allSections: function (book, $stateParams) {
                        return book.sections($stateParams.bookId);
                    }
                }
            })
            .state('app.discipline.themes', {
                url: '/themes/:sectionId',
                templateUrl: 'views/themes/themes.html',
                controller: 'Themes',
                controllerAs: 'vm',
                resolve: {
                    allThemes: function (book, $stateParams) {
                        return book.themes($stateParams.sectionId);
                    }
                }
            })
            .state('app.discipline.tasks', {
                url: '/tasks/:themeId',
                templateUrl: 'views/task/all/task.all.html',
                controller: 'Tasks',
                controllerAs: 'vm',
                resolve: {
                    allTasks: function (task, $stateParams) {
                        return task.all($stateParams.themeId);
                    }
                }
            })
            .state('app.discipline.task', {
                url: '/task/:taskId',
                templateUrl: 'views/task/one/task.one.html',
                controller: 'Task',
                controllerAs: 'vm',
                resolve: {
                    prepGetLabels: function(site) {
                        return site.getLabels('DoneTask');
                    },
                    taskInfo: function (task, $stateParams){
                        return task.one($stateParams.taskId);
                    }
                }
            })
            .state('app.settings', {
                url: '/settings',
                templateUrl: 'views/settings/settings.html',
                controller: 'Settings',
                controllerAs: 'vm',
                resolve: {
                    userInfo: function (user) {
                        return user.get();
                    }
                }
            })
            .state('app.about', {
                url: '/about',
                templateUrl: 'views/about/about.html',
                controller: 'About',
                controllerAs: 'vm'
            })
            .state('error', {
                template: "<ion-nav-view></ion-nav-view>"
            })
            .state('error.internet', {
                url: '/nointernet',
                templateUrl: 'views/error/nointernet.html'
            });


        $urlRouterProvider.otherwise('/login');
    }


})();

