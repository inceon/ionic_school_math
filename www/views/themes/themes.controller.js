;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Themes', Sections);

    Sections.$inject = ['$rootScope', '$stateParams', 'book'];

    function Sections($rootScope, $stateParams, book) {

        $rootScope.page = {
            title: 'Themes'
        };
        var vm = this;

        vm.themes = null;
        vm.sectionId = $stateParams.sectionId;

        book.themes(vm.sectionId)
            .then(function(response){
                vm.themes = response.models;
            });
    }
})();
