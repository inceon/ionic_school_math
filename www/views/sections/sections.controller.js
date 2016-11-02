;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Sections', Sections);

    Sections.$inject = ['$rootScope', '$stateParams', 'book'];

    function Sections($rootScope, $stateParams, book) {

        $rootScope.page = {
            title: 'Sections'
        };

        var vm = this;

        vm.sections = null;
        vm.bookId = $stateParams.bookId;

        book.sections(vm.bookId)
            .then(function(response){
                vm.sections = response.section.models;
            });

    }
})();
