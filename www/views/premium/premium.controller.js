;(function () {
    "use strict";
    angular
        .module('app')
        .controller('Premium', About);

    About.$inject = ['$rootScope', 'purchase'];

    function About ($rootScope, purchase) {

        $rootScope.page = {
            title: 'Підписки'
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
