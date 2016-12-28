(function() {
    "use strict";
    angular
        .module('model.purchase')
        .service('purchase', function($rootScope, $timeout) {
        var IAP = {
            initialize: function() {
                if (!window.store) {
                    console.log('In-App Purchases not available');
                    return;
                }

                store.register({
                    id: 'onemonthsubscription',
                    type: store.NON_CONSUMABLE
                });

                store.register({
                    id: 'threemonthsubscription',
                    type: store.NON_CONSUMABLE
                });

                store.register({
                    id: 'sixmonthsubscription',
                    type: store.NON_CONSUMABLE
                });

                store.when('onemonthsubscription')
                    .approved(function(product) {
                        product.finish();
                        localStorage['expirationDate'] = moment().add('1', 'month').valueOf();
                        console.log('BOUGHT', product.id);
                        location.reload();
                    })
                    .updated(function(product) {
                        if (product.owned) {
                            console.log('RESTORE', product.id);
                            localStorage['expirationDate'] = moment().add('1', 'month').valueOf();
                            location.reload();
                        }
                    })
                    .cancelled(function() {
                        console.log('cancel');
                    });

                store.when('threemonthsubscription')
                    .approved(function(product) {
                        product.finish();
                        localStorage['expirationDate'] = moment().add('3', 'month').valueOf();
                        console.log('BOUGHT', product.id);
                        location.reload();
                    })
                    .updated(function(product) {
                        if (product.owned) {
                            console.log('RESTORE', product.id);
                            localStorage['expirationDate'] = moment().add('3', 'month').valueOf();
                            location.reload();
                        }
                    })
                    .cancelled(function() {
                        console.log('cancel');
                    });

                store.when('sixmonthsubscription')
                    .approved(function(product) {
                        product.finish();
                        localStorage['expirationDate'] = moment().add('6', 'month').valueOf();
                        console.log('BOUGHT', product.id);
                        location.reload();
                    })
                    .updated(function(product) {
                        if (product.owned) {
                            console.log('RESTORE', product.id);
                            localStorage['expirationDate'] = moment().add('6', 'month').valueOf();
                            location.reload();
                        }
                    })
                    .cancelled(function() {
                        console.log('cancel');
                    });

                store.error(function(e) {
                    alert('[' + e.code + ']: ' + e.message, null, 'Error', 'dismiss');
                });
            },
            buy: function (productId) {
                store.order(productId);
            },
            restore: function () {
                store.refresh();
            }
        };

        return IAP;
    });
})();
