;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Disciplines', Disciplines);

    Disciplines.$inject = ['$rootScope', 'allDiscipline', 'task', 'discipline', '$state', 'todo', '$ionicSlideBoxDelegate'];

    function Disciplines($rootScope, allDiscipline, task, discipline, $state, todo, $ionicSlideBoxDelegate) {

        $rootScope.page = {
            title: 'Предмети'
        };

        var vm = this;

        vm.slide = 0;
        vm.todo = todo;
        vm.disciplines = allDiscipline.models;
        vm.disciplineBooks = disciplineBooks;

        function disciplineBooks(data) {
            discipline.myBook(data.disciplineId)
                    .then(function (userBook) {
                        if (userBook.count_model > 1) {
                            task.last({
                                book_id: userBook.models[0].book.id
                            }).then(function (last) {
                                if (last.task_id) {
                                    $state.go('app.discipline.task', {
                                        taskId: last.task_id
                                    });
                                } else {
                                    $state.go('app.discipline.book', {
                                        bookId: userBook.models[0].book.id
                                    });
                                }
                            });
                        } else {
                            $state.go('app.discipline.books', data);
                        }
                    });
        }

        vm.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        vm.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };
        vm.selectBook = function (idSlide) {
            var id = allDiscipline.models[idSlide].id;
            console.log(id);
            $state.go("app.discipline.books", {disciplineId: id});
        }
    }
})();
