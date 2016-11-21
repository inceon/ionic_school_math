;(function () {
    "use strict";

    angular
        .module('app')
        .controller('DisciplineBooks', DisciplineBooks);

    DisciplineBooks.$inject = ['$state', 'discipline', 'book', '$rootScope', 'userBook', 'allBooks', '$ionicSlideBoxDelegate'];

    function DisciplineBooks($state, discipline, book, $rootScope, userBook, allBooks, $ionicSlideBoxDelegate) {

        $rootScope.page = {
            title: 'Книги з предмету'
        };

        var vm = this;

        vm.books = null;
        vm.slide = 0;
        vm.selectBook = selectBook;

        if(userBook.count_model === 1) {
            $state.go('app.discipline.book', {
                bookId: userBook.models[0].book.id
            });
        } else if(userBook.count_model > 1) {
            vm.myBook = userBook.models;
        } else {
            vm.books = allBooks.models;
        }

        vm.next = function() {
            $ionicSlideBoxDelegate.next();
        };
        vm.previous = function() {
            $ionicSlideBoxDelegate.previous();
        };

        function selectBook (id){
            book.create(vm.books[id]);
        }

    }
})();
