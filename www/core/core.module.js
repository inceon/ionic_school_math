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
        'ngImgCrop',
        'ui.mask',
        /*
         * Our reusable cross app code modules
         */
        'factory.request',
        'toastr',
        'naif.base64',
        /*
         * 3rd Party modules
         */
        'ionic'
        ])
})();
