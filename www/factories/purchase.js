;(function () {
    'use strict';
    angular
        .module('factory.purchase', [])
        .factory('fpurchase', fpurchase);

    fpurchase.$inject = ['user', 'purchase', '$ionicActionSheet'];

    function fpurchase(user, purchase, $ionicActionSheet) {

        return {
            showBuyOptions: function() {
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

                        purchase.buy(purchaseName);

                        return true;
                    }
                });
            }
        };
    }
})();
