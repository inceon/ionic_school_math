;(function () {
    "use strict";
    angular
        .module('app')
        .controller('Premium', About);

    About.$inject = ['$rootScope', 'purchase'];

    function About($rootScope, purchase) {

        $rootScope.page = {
            title: 'Підписки'
        };

        var vm = this;
        vm.refresh = refresh;
        vm.buy = buy;
        vm.openMarket = openMarket;

        // vm.products = purchase.getProducts();
        vm.products = [{
            transaction: {
                receipt: {
                    purchaseTime: 1484322559002
                }
            }
        }];

        function refresh() {
            purchase.restore();
            vm.products = purchase.getProducts();
        }

        function buy() {
            purchase.buy("onemonthsubscription");
            this.refresh();
        }

        function openMarket() {
            cordova.plugins.market.open('com.apes.schoolMathApp');
        }

    }

})();
