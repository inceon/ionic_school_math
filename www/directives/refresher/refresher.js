'use strict';

angular.module('directive.refresher', [])
    .directive('refresher', function () {
        return {
            restrict: 'AE',
            templateUrl: 'directives/refresher/refresher.html',
            scope: {},
            replace: true,
            link: function postLink(scope, element, attrs) {
                window.addEventListener("load", function() {
                    window.scrollBy(0, 100);
                }, false);

                window.document.addEventListener("scroll", function(){
                    if(window.pageYOffset == 0)
                    {
                        alert("Loading data using AJAX");
                        window.scrollBy(0, 100);
                    }
                }, false);
            }
        };
    });
