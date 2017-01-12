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
            showBuyOptions: showBuyOptions,
            getProducts: getProducts
        };

        function initialize() {
            if (!window.store) {
                console.log('In-App Purchases not available');
                return;
            }
            window.store.verbosity = store.DEBUG;

            window.store.register({
                id: 'onemonthsubscription',
                type: window.store.PAID_SUBSCRIPTION
            });

            window.store.register({
                id: 'threemonthsubscription',
                type: window.store.PAID_SUBSCRIPTION
            });

            window.store.register({
                id: 'sixmonthsubscription',
                type: window.store.PAID_SUBSCRIPTION
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
            });
            this.restore();*/

            window.store.when("product").updated(function(p) {
                console.log("Product updated: " + p.id + " (" + p.state + ")");
                // Warn about invalid products
                if (p.state == window.store.INVALID) {
                    console.log("Product " + p.id + " can't be loaded from the store.");
                    // this.products[p.id];
                }
                if (p.owned)
                    $rootScope.test = "TEEEEEEEEEEEEEEEEEST";
                // window.store.refresh();
                // p.finish();
            });

            window.store.error(function(err) {
                console.log("error");
            });

            window.store.when("product").approved(function(product) {
                console.log("approved");
                product.finish();
            });

            window.store.when("product").cancelled(function(product) {
                console.log("cancel");
            });

            this.restore();
        }

        function buy(productId) {
            window.store.order(productId);
            window.store.refresh();
        }

        function restore() {
            window.store.refresh();
        }

        function showBuyOptions() {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: 'Придбати 1 місяць підписки' },
                    { text: 'Придбати 3 місяця підписки' },
                    { text: 'Придбати 6 місяців підписки' }
                ],
                titleText: 'Підписка дозволяє задавати питання репетитору',
                cancelText: 'Відмінити',
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
                    window.store.refresh();
                    return true;
                }
            });
            return hideSheet;
        }

        function getProducts(){
            return window.store.products;
        }
    }
})();
