;(function () {
    "use strict";
    angular
        .module('app')
        .controller('About', About);

    About.$inject = ['$rootScope'];

    function About ($rootScope) {

        $rootScope.page = {
            title: 'Disciplines'
        };

        var vm = this;

        nonRenewing.onStatusChange(function(status) {
            if (status) {
                console.log(
                    'isSubscribed: ' + status.subscriber + '\n' +
                    'expiryDate: ' + status.expiryDate + '\n'
                );
            }
            else {
                console.log('Status is Unknown');
            }
        });

        vm.buy = function () {
            nonRenewing.openSubscriptionManager();
        }
    }

})();
