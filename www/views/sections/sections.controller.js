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

        vm.showThemes = showThemes;
        vm.sections = allSections.section.models;

        function showThemes(section) {
            if (!section.data) {
                book.themes(section.id)
                    .then(function (res) {
                        section.data = res.models;
                        section.data.show = true;
                    });
            } else {
                section.data.show = !section.data.show;
            }
        }
    }
})();
