;(function () {
    "use strict";
    angular
        .module('app')
        .controller('About', About);

    About.$inject = ['$rootScope', 'purchase'];

    function About ($rootScope, purchase) {

        $rootScope.page = {
            title: 'Disciplines'
        };

        var vm = this;

        vm.products = purchase.getProducts();

        vm.buy = function () {
            console.log("click on buy");
            purchase.showBuyOptions();
        };

        vm.refresh = function () {
           purchase.restore();
        };


    }

})();
