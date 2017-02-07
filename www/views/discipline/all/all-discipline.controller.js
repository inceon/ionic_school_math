;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Disciplines', Disciplines);

    Disciplines.$inject = ['$rootScope', 'allDiscipline', 'task', 'user', 'discipline', '$state', '$ionicSlideBoxDelegate'];

    function Disciplines($rootScope, allDiscipline, task, user, discipline, $state, $ionicSlideBoxDelegate) {

        $rootScope.page = {
            title: 'Предмети',
            isHome: true
        };

        var vm = this;

        vm.slide = $rootScope.activeDisciplineSlide | 0;
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
        vm.selectDiscipline = selectDiscipline;
        vm.slideHasChanged = slideHasChanged;

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

        function selectDiscipline() {
            var id = vm.disciplines[vm.slide].id;
            disciplineBooks({
                disciplineId: id
            });
        }

        function slideHasChanged(index) {
            $rootScope.activeDisciplineSlide = index;
        }

        vm.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        vm.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };
    }
})();
