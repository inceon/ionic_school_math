;(function () {
    "use strict";

    angular
        .module('app')
        .controller('DisciplineBooks', DisciplineBooks);

    DisciplineBooks.$inject = ['$state', '$stateParams', 'discipline', 'book', '$rootScope', 'allBooks', '$ionicSlideBoxDelegate'];

    function DisciplineBooks($state, $stateParams, discipline, book, $rootScope, allBooks, $ionicSlideBoxDelegate) {

        $rootScope.page = {
            title: 'Книги з предмету'
        };

        var vm = this;

        vm.slide = 0;
        vm.selectBook = selectBook;
        vm.books = allBooks.models;
        console.log(vm.books);
        vm.lockSlide = lockSlide;

        vm.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        vm.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };

        function selectBook(id) {
            console.log(id);
            book.create(vm.books[id%vm.books.length].id)
                .then(function(res){
                    console.log(res);
                    $state.go('app.discipline.book', {
                        bookId: vm.books[id%vm.books.length].book.id,
                        disciplineId: $stateParams.disciplineId,
                        id: res.id
                    });
                });
        }

        function lockSlide () {
            $ionicSlideBoxDelegate.enableSlide( false );
        }

    }
})();
