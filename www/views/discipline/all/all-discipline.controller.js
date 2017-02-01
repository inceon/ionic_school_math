;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Disciplines', Disciplines);

    Disciplines.$inject = ['$rootScope', '$localStorage', 'allDiscipline', 'task', 'user', 'discipline', '$state', '$ionicSlideBoxDelegate'];

    function Disciplines($rootScope, $localStorage, allDiscipline, task, user, discipline, $state, $ionicSlideBoxDelegate) {

        $rootScope.page = {
            title: 'Предмети',
            isHome: true
        };

        var vm = this;

        vm.slide = 0;
        task.last()
            .then(function(res){
                vm.lastTask = res.models;
            });
        user.todo()
            .then(function(res){
                vm.todo = res;
            });

        vm.disciplines = allDiscipline.models;
        vm.disciplineBooks = disciplineBooks;

        function disciplineBooks(data) {
            discipline.myBook(data.disciplineId)
                .then(function (userBook) {
                    if (userBook.count_model >= 1) {
                        $state.go('app.discipline.book', {
                            bookId: userBook.models[0].book.id,
                            disciplineId: data.disciplineId,
                            id: userBook.models[0].id,
                            book_discipline_id: userBook.models[0].book_discipline_id
                        });
                    } else {
                        $state.go('app.discipline.books', data);
                    }
                });
        }

        vm.selectBook = function (idSlide) {
            var id = vm.disciplines[idSlide].id;
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
