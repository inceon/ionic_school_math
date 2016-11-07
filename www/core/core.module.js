;
(function() {
    'use strict';
    angular
        .module('app.core', [
        /*
         * Angular modules
         */
        'ngStorage',
        'ngMessages',
        'ngMaterial',
        'ngFileUpload',
        'ui.mask',
        /*
         * Our reusable cross app code modules
         */
        'factory.request', 'toastr',
        /*
         * 3rd Party modules
         */
        'ionic'
        ])
})();
