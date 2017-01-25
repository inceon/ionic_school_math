;(function () {
    "use strict";

    angular
        .module('app')
        .controller('Theory', Tasks);

    Tasks.$inject = ['$rootScope', 'data'];

    function Tasks($rootScope, data) {

        $rootScope.page = {
            title: 'Теорія'
        };

        var vm = this;
        vm.data = data;
        console.log(data);
    }
})();
