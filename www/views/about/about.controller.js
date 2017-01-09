;(function () {
    "use strict";
    angular
        .module('app')
        .controller('About', About);

    About.$inject = ['$rootScope', 'purchase', 'fpurchase'];

    function About ($rootScope, purchase, fpurchase) {

        $rootScope.page = {
            title: 'Disciplines'
        };

        var vm = this;

        vm.buy = function () {
            console.log("click on buy");
            purchase.showBuyOptions();
        }
    }

})();
