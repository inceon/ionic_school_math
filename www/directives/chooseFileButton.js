;(function () {
    angular.module('directive.inputFile', [])
        .directive('chooseFileButton', function () {
            return {
                restrict: 'E',
                link: function (scope, elem, attrs) {
                    var button = elem.find('button');
                    var input = elem.find('input');
                    input.css({display: 'none'});
                    button.bind('click', function () {
                        input[0].click();
                    });
                }
            };
        });
})();
