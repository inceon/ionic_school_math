;(function () {
    "use strict";
    angular.module('directive.record', [])
        .directive('record', function () {
            return {
                scope: {},
                restrict: 'AE',
                templateUrl: 'directives/record/record.html',
                link: function (scope, element, attrs) {
                    var audioSrc = attrs.src;

                    var audio = new Audio(audioSrc);
                    scope.time = 0;

                    audio.addEventListener('loadedmetadata', function() {
                        scope.duration = Math.trunc(audio.duration);
                        scope.paused = false;

                        audio.addEventListener('timeupdate',function (){
                            scope.time = parseInt(audio.currentTime, 10);
                            scope.$apply();
                        });

                        scope.play = function () {
                            scope.paused = true;
                            audio.play();
                        };

                        scope.pause = function () {
                            scope.paused = false;
                            audio.pause();
                        };

                        scope.change = function () {
                            console.log(time);
                        };

                        scope.$apply();
                    });
                }
            }
        });
})();
