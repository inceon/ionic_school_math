;(function () {
    "use strict";

    angular
        .module('app')
        .controller('DisciplineBooks', DisciplineBooks);

    DisciplineBooks.$inject = ['$state', 'discipline', 'book', '$rootScope', 'allBooks', '$ionicSlideBoxDelegate'];

    function DisciplineBooks($state, discipline, book, $rootScope, allBooks, $ionicSlideBoxDelegate) {

        $rootScope.page = {
            title: 'Книги з предмету'
        };

        var vm = this;

        vm.books = null;
        vm.slide = 0;
        vm.selectBook = selectBook;

        vm.books = allBooks.models;

        vm.next = function () {
            $ionicSlideBoxDelegate.next();
        };
        vm.previous = function () {
            $ionicSlideBoxDelegate.previous();
        };

        function selectBook(id) {
            book.create(vm.books[id]);
        }

    }
})();
