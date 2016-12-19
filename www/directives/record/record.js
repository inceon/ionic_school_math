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
                    scope.audio = audio;

                    audio.addEventListener("loadedmetadata", function() {
                        scope.paused = false;
                        $timeout(function(){
                            scope.duration = audio.duration;
                            console.log(audio.duration);
                        }, 1000);

                        audio.addEventListener("canplaythrough", function(){
                            scope.duration = audio.duration;
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
                            //alert('play: ' + audioSrc);
                            scope.duration = audio.duration;
                            audio.play();
                        };

                        scope.pause = function () {
                            scope.paused = false;
                            alert('pause: ' + audioSrc);
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
