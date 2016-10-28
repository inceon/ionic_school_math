;(function () {
    'use strict';
    angular
        .module('app')
        .controller('Dashboard', Dashboard);

    Dashboard.$inject = ['dashboardPrepService'];

    function Dashboard(dashboardPrepService) {

        var vm = this;

        vm.movies = dashboardPrepService;

        console.log(vm.movies);
        console.log(dashboardPrepService);


    }
})();
