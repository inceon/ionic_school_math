;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Sections', Sections);

    Sections.$inject = ['$rootScope', 'allSections', 'book'];

    function Sections($rootScope, allSections, book) {

        $rootScope.page = {
            title: 'Sections'
        };

        var vm = this;

        vm.sections = null;
        vm.sections = allSections.section.models;

    }
})();
