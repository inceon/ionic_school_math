;(function () {
    "use strict";

    angular
        .module('app')
        .controller('DisciplineBooks', DisciplineBooks);

    DisciplineBooks.$inject = ['$stateParams', 'discipline', '$rootScope'];

    function DisciplineBooks($stateParams, discipline, $rootScope) {

        $rootScope.page = {
            title: 'Discipline Books'
        };

        var vm = this;

        vm.books = null;
        vm.disciplineId = $stateParams.disciplineId;

        discipline.books(vm.disciplineId)
                .then(function(response){
                    vm.books = response.models;
                });

    }
})();
