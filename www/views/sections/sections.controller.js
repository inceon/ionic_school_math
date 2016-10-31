;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Sections', Sections);

    Sections.$inject = ['$stateParams', 'book'];

    function Sections($stateParams, book) {

        var vm = this;

        vm.sections = null;
        vm.bookId = $stateParams.bookId;

        book.sections(vm.bookId)
            .then(function(response){
                vm.sections = response.section.models;
            });

    }
})();
