;(function () {
    "use strict";

    angular
        .module('app')
        .controller('DisciplineBooks', DisciplineBooks);

    DisciplineBooks.$inject = ['$stateParams', 'discipline', 'book', '$rootScope'];

    function DisciplineBooks($stateParams, discipline, book, $rootScope) {

        $rootScope.page = {
            title: 'Discipline Books'
        };

        var vm = this;

        vm.books = null;
        vm.disciplineId = $stateParams.disciplineId;
        vm.selectBook = selectBook;

        discipline.books(vm.disciplineId)
                .then(function(response){
                    vm.books = response.models;
                });

        function selectBook (){
            book.create(vm.data);
        }

    }
})();
