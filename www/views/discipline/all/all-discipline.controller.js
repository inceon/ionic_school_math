;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Disciplines', Disciplines);

    Disciplines.$inject = ['$rootScope', 'discipline', '$state'];

    function Disciplines($rootScope, discipline, $state) {

        $rootScope.page = {
            title: 'Disciplines'
        };

        var vm = this;

        vm.disciplines = null;
        discipline.all()
                  .then(function(response){
                      vm.disciplines = response.models;
                  });
    }
})();
