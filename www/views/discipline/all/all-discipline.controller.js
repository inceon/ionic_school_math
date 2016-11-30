;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Disciplines', Disciplines);

    Disciplines.$inject = ['$rootScope', '$localStorage', 'allDiscipline', 'task', 'discipline', '$state', 'todo', '$ionicSlideBoxDelegate'];

    function Disciplines($rootScope, $localStorage, allDiscipline, task, discipline, $state, todo, $ionicSlideBoxDelegate) {

        $rootScope.page = {
            title: 'Предмети',
            isHome: true
        };

        var vm = this;

        vm.slide = 0;
        vm.todo = todo;
        vm.disciplines = allDiscipline.models;
        vm.disciplineBooks = disciplineBooks;
        vm.lastTask = $localStorage.lastTask;

        function disciplineBooks(data) {
            discipline.myBook(data.disciplineId)
                .then(function (userBook) {
                    if (userBook.count_model >= 1) {
                        $state.go('app.discipline.book', {
                            bookId: userBook.models[0].book.id
                        });
                    } else {
                        $state.go('app.discipline.books', data);
                    }
                });
        }

        vm.selectBook = function (idSlide) {
            var id = allDiscipline.models[idSlide].id;
            disciplineBooks({
                disciplineId: id
            });
        };

        vm.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        vm.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };
    }
})();
