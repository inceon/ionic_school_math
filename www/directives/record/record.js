;(function () {
    "use strict";
    angular.module('directive.record', [])
        .directive('record', function () {
            return {
                scope: {},
                restrict: 'AE',
                templateUrl: 'directives/record/record.html',
                link: function (scope, element, attrs, $timeout) {
                    var audioSrc = attrs.src;

                    if(audioSrc.search('http:') == -1)
                        audioSrc = 'file://' + audioSrc;
                    var audio = new Audio(audioSrc);
                    scope.time = 0;
                    audio.preload = "auto";

                    audio.addEventListener("loadedmetadata", function() {
                        scope.paused = false;
                        scope.duration = audio.duration;

                        audio.addEventListener("canplaythrough", function(){
                            scope.duration = Math.trunc(audio.duration);
                        });

                        audio.addEventListener('durationchange', function(e) {
                            scope.duration = Math.trunc(e.target.duration);
                        });

                        audio.addEventListener("timeupdate", function (){
                            scope.time = parseInt(audio.currentTime, 10);
                            scope.$apply();
                        });

                        audio.addEventListener("ended", function (){
                            scope.paused = false;
                            audio.currentTime = 0;
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
                    });
                }
            }
        });
})();
