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
