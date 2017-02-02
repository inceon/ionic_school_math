;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Sections', Sections);

    Sections.$inject = ['$rootScope', '$stateParams', 'allBooks', 'book'];

    function Sections($rootScope, $stateParams, allBooks, book) {

        $rootScope.page = {
            title: 'Теми'
        };

        var vm = this;

        vm.showThemes = showThemes;
        vm.books = allBooks.models;
        vm.selectedBook = $stateParams.book_discipline_id;

        vm.bookImage = vm.books.filter(function (el) {
            return el.id == vm.selectedBook;
        })[0].book.image;

        vm.selectNewBook = selectNewBook;
        book.sections($stateParams.bookId)
            .then(function(res){
                vm.sections = res.section.models;
            });

        function showThemes(section) {
            if (!section.data) {
                book.themes(section.id)
                    .then(function (res) {
                        section.data = res.models;
                        section.data.show = true;
                    });
            } else {
                section.data.show = !section.data.show;
            }
        }

        function selectNewBook(){
            var findBook = vm.books.filter(function (el) {
                return el.id == vm.selectedBook;
            })[0];

            vm.bookImage = findBook.book.image;

            book.sections(findBook.book.id)
                .then(function(res){
                    vm.sections = res.section.models;
                });

            book.update({
                id: $stateParams.id,
                book_discipline_id: vm.selectedBook
            });
        }
    }
})();
