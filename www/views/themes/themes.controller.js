;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Themes', Sections);

    Sections.$inject = ['$stateParams', 'book'];

    function Sections($stateParams, book) {

        var vm = this;

        vm.themes = null;
        vm.sectionId = $stateParams.sectionId;

        book.themes(vm.sectionId)
            .then(function(response){
                vm.themes = response.theme.models;
            });
    }
})();
