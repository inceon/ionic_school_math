;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Themes', Sections);

    Sections.$inject = ['$rootScope', 'allThemes', 'book'];

    function Sections($rootScope, allThemes, book) {

        $rootScope.page = {
            title: 'Themes'
        };
        var vm = this;

        vm.themes = allThemes.models;
    }
})();
