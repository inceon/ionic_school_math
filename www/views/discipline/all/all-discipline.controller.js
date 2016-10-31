;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Disciplines', Disciplines);

    Disciplines.$inject = ['discipline', '$rootScope'];

    function Disciplines(discipline, $rootScope) {

        var vm = this;

        vm.disciplines = null;
        discipline.all()
                  .then(function(response){
                      vm.disciplines = response.models;
                  });

    }
})();
