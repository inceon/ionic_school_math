(function() {
    "use strict";
    angular
        .module('model.purchase', [])
        .service('purchase', purchase);

    purchase.$inject = ['$rootScope', '$timeout', '$ionicActionSheet'];
    function purchase($rootScope, $timeout, $ionicActionSheet) {
        return {
            initialize: initialize,
            buy: buy,
            restore: restore,
            showBuyOptions: showBuyOptions
        };

        function initialize() {
            if (!window.store) {
                console.log('In-App Purchases not available');
                return;
            }
            console.log("init");
            window.store.verbosity = store.DEBUG;

            window.store.register({
                id: 'onemonthsubscription',
                type: window.store.NON_RENEWING_SUBSCRIPTION,
                duration: 3600
            });

            window.store.register({
                id: 'threemonthsubscription',
                type: window.store.NON_RENEWING_SUBSCRIPTION,
                duration: 3600
            });

            window.store.register({
                id: 'sixmonthsubscription',
                type: window.store.NON_RENEWING_SUBSCRIPTION,
                duration: 3600
            });

            /*window.store.when('onemonthsubscription')
                .approved(function(product) {
                    product.finish();
                    console.log('BOUGHT', product.id);
                })
                .updated(function(product) {
                    if (product.owned) {
                        console.log('RESTORE', product.id);
                    }
                })
                .cancelled(function() {
                    console.log('cancel');
                });

            window.store.when('threemonthsubscription')
                .approved(function(product) {
                    product.finish();
                    console.log('BOUGHT', product.id);
                })
                .updated(function(product) {
                    if (product.owned) {
                        console.log('RESTORE', product.id);
                    }
                })
                .cancelled(function() {
                    console.log('cancel');
                });

            window.store.when('sixmonthsubscription')
                .approved(function(product) {
                    product.finish();
                    console.log('BOUGHT', product.id);
                })
                .updated(function(product) {
                    if (product.owned) {
                        console.log('RESTORE', product.id);
                    }
                })
                .cancelled(function() {
                    console.log('cancel');
                });

            window.store.error(function(e) {
                alert('[' + e.code + ']: ' + e.message, null, 'Error', 'dismiss');
            });*/

            window.store.when("product").updated(function(p) {
                console.log("updated");
            });

            window.store.error(function(err) {
                console.log("error");
            });

            window.store.when("product").cancelled(function(p) {
                console.log("canceled");
            });

            window.store.refresh();
        }

        function buy(productId) {
            window.store.order(productId);
        }

        function restore() {
            window.store.refresh();
        }

        function showBuyOptions() {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Buy 1 month membership' },
                    { text: 'Buy 3 month membership' },
                    { text: 'Buy 6 month membership' }
                ],
                titleText: 'All memberships include <b>unlimited tracking</b> and <b>remove ads</b>',
                cancelText: 'Cancel',
                cancel: function() {
                    hideSheet();
                },
                buttonClicked: function(index) {
                    var options = [1, 3, 6],
                        selected = options[index],
                        purchaseName = '';

                    if (selected == 1) {
                        purchaseName = 'onemonthsubscription'
                    } else if (selected == 3) {
                        purchaseName = 'threemonthsubscription'
                    } else if (selected == 6) {
                        purchaseName = 'sixmonthsubscription';
                    }

                    window.store.order(purchaseName);
                    return true;
                }
            });
            return hideSheet;
        }
    }
})();
