(function() {
    "use strict";
    angular
        .module('model.purchase', [])
        .service('purchase', purchase);

    purchase.$inject = ['$rootScope', '$timeout', '$ionicActionSheet', 'user', 'toastr'];
    function  purchase($rootScope, $timeout, $ionicActionSheet, user, toastr) {
        return {
            initialize: initialize,
            buy: buy,
            restore: restore,
            getProducts: getProducts,
            checkSubscription: checkSubscription
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

            window.store.when("product")
                .updated(function(p) {
                    console.log("Product updated: " + p.id + " (" + p.state + ")");
                    // Warn premium invalid products
                    if (p.state == window.store.INVALID) {
                        console.log("Product " + p.id + " can't be loaded from the store.");
                        // this.products[p.id];
                    }
                    // window.store.refresh();
                    // p.finish();
                });

            window.store.error(function(err) {
                console.log("error");
                toastr.error('Помилка Google Play');
            });

            window.store.when("product")
                .approved(function(product) {
                    console.log("approved");
                    user.subscription({
                        summa: product.price,
                        code: product.transaction.purchaseToken

                    })
                    .then(function () {
                        product.finish();
                        window.store.refresh();
                    });
                });

            window.store.when("product")
                .cancelled(function(product) {
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

        function checkSubscription() {
            window.store.refresh();
            var res = Promise.reject();
            angular.forEach(window.store.products, function(product){
                console.log(product);
                if(product.transaction && product.owned){
                    res = Promise.resolve(product);
                }
            });
            return res;
        }

        function getProducts(){
            return window.store.products;
        }
    }
})();
