;(function () {
    "use strict";

    angular
        .module('app')
        .controller('DisciplineBooks', DisciplineBooks);

    DisciplineBooks.$inject = ['$stateParams', 'discipline', '$rootScope'];

    function DisciplineBooks($stateParams, discipline, $rootScope) {

        var vm = this;

        vm.books = null;
        vm.disciplineId = $stateParams.disciplineId;

        discipline.books(vm.disciplineId)
                .then(function(response){
                    vm.books = response.models;
                });

    }
})();
