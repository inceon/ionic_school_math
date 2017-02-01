;(function () {
    'use strict';
    angular
        .module('app')
        .config(mainConfig);

    mainConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', 'toastrConfig', 'CacheFactoryProvider'];

    function mainConfig($stateProvider, $urlRouterProvider, $ionicConfigProvider, toastrConfig, CacheFactoryProvider) {

        $ionicConfigProvider.views.maxCache(0);
        $ionicConfigProvider.backButton.text('Назад');
        angular.extend(CacheFactoryProvider.defaults, { maxAge: 15 * 60 * 1000 });

        var options = {
            debug: false,
            newestOnTop: true,
            positionClass: "toast-top-full-width",
            preventOpenDuplicates: true,
            onclick: null,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        };

        angular.extend(toastrConfig, options);

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
            .state('app', {
                url: '/app',
                templateUrl: 'views/left_menu/left_menu.html',
                controller: 'LeftMenu',
                controllerAs: 'vm'
            })
            .state('app.discipline', {
                url: '/discipline/:disciplineId',
                template: "<ion-nav-view></ion-nav-view>",
                abstract: true
            })
            .state('app.discipline.all', {
                url: '/all',
                parent: 'app.discipline',
                templateUrl: 'views/discipline/all/all-discipline.html',
                controller: 'Disciplines',
                controllerAs: 'vm',
                resolve: {
                    allDiscipline: function(discipline) {
                        return discipline.all();
                    }
                }
            })
            .state('app.discipline.books', {
                url: '/books',
                templateUrl: 'views/discipline/books/books.html',
                controller: 'DisciplineBooks',
                controllerAs: 'vm',
                resolve: {
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
                    },
                    allBooks: function (discipline, $stateParams) {
                        return discipline.books($stateParams.disciplineId);
                    }
                },
                params: {
                    id: null,
                    book_discipline_id: null
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
                    },
                    allTheory: function (theory, $stateParams) {
                        return theory.all({
                            table: 'theme',
                            row_id: $stateParams.themeId
                        })
                    }
                }
            })
            .state('app.discipline.task', {
                url: '/task/:taskId',
                templateUrl: 'views/task/one/task.one.html',
                controller: 'Task',
                controllerAs: 'vm',
                resolve: {
                    resolveData: function (task, comment, site, $stateParams, $q){
                        return $q.all({
                            prepGetLabels: site.getLabels('DoneTask'),
                            taskInfo: task.one($stateParams.taskId),
                            subtasks: task.subtasks($stateParams.taskId),
                            chats: comment.all($stateParams.taskId)
                        });
                    }
                }
            })
            .state('app.discipline.theory', {
                url: '/theory/:id',
                templateUrl: 'views/task/theory/task.theory.html',
                controller: 'Theory',
                controllerAs: 'vm',
                resolve: {
                    data: function (theory, $stateParams) {
                        return theory.one($stateParams.id);
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
            .state('app.premium', {
                url: '/premium',
                templateUrl: 'views/premium/premium.html',
                controller: 'Premium',
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

