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
        'jrCrop',
        'ui.mask',
        /*
         * Our reusable cross app code modules
         */
        'factory.request',
        'toastr',
        'naif.base64',
        'angularMoment',
        /*
         * 3rd Party modules
         */
        'ionic'
        ])
})();
