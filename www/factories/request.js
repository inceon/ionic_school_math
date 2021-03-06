;(function () {
    'use strict';
    angular
        .module('factory.request', [])
        .factory('http', http);

    http.$inject = ['$http', '$sessionStorage', 'toastr', '$ionicLoading', '$q', '$timeout', 'CacheFactory'];

    function http($http, $sessionStorage, toastr, $ionicLoading, $q, $timeout, CacheFactory) {
        console.log('create request service');

        $http.defaults.cache = CacheFactory('defaultCache', {
            deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
            storageMode: 'localStorage'
        });

        return {
            get: function (url, data, cache, loader) {
                return request('GET', url, data, cache, loader);
            },
            post: function (url, data) {
                return request('POST', url, data);
            },
            file: function (url, data) {
                return requestFile(url, data);
            },
            audio: function (url, data) {
                return requestAudio(url, data);
            },
            init: function () {
                loading = 0;
                timeout = 200;
            }
        };

        var loading, timeout;


        /**
         *
         * @param {string} method - Method for request
         * @param {string} url - Request url
         * @param {object} data - Data to request
         * @param {bool} cache - True if you want to cache the page
         * @param {bool} loader - True if you want to hide loader
         * @returns {Promise}
         */
        function request(method, url, data, cache, loader) {
            if (loader != true) {
                console.log('loader', 'url: '+url, 'loader: '+loader, 'cache: '+cache);
                $ionicLoading.show({
                    templateUrl: 'views/lazyload/lazyload.html'
                });
            }
            loading++;
            console.log(loading, "start request;", "loader: " + loader);

            var config = {
                dataType: 'json',
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };

            if (method === 'GET') {
                if (cache === true) {
                    config.cache = true;
                } else {
                    config.cache = false;
                }
                config.params = data;
                config.timeout = 20000;
            }
            else {
                config.data = data;
            }

            if ($sessionStorage.auth_key) {
                config.url = url + '?auth_key=' + $sessionStorage.auth_key + '&lang=uk-UA';
            }
            else {
                config.url = url + '?lang=uk-UA';
            }

            return $http(config)
                .then(requestComplete)
                .catch(requestFailed);
        }

        function requestFile(url, data) {
            $ionicLoading.show({
                templateUrl: 'views/lazyload/lazyload.html'
            });
            loading++;
            console.log(loading, "start request");

            var config = {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            };
            if ($sessionStorage.auth_key) {
                url = url + '?auth_key=' + $sessionStorage.auth_key;
            }

            return $http.post(url, data, config)
                .then(requestComplete)
                .catch(requestFailed);
        }

        function requestAudio(url, data) {
            $ionicLoading.show({
                templateUrl: 'views/lazyload/lazyload.html'
            });
            loading++;
            console.log(loading, "start request");

            if ($sessionStorage.auth_key) {
                url = url + '?auth_key=' + $sessionStorage.auth_key;
            }

            var ft = new FileTransfer();

            var promise = $q.defer();
            ft.upload(data.audio, encodeURI(url), function (response) {
                $timeout(function () {
                    if (--loading <= 0) {
                        $ionicLoading.hide();
                    }
                }, timeout);

                console.info('response complete', JSON.parse(response.response));

                promise.resolve(JSON.parse(response.response));
            }, function (error) {
                console.log('error', error);
                $timeout(function () {
                    if (--loading <= 0) {
                        $ionicLoading.hide();
                    }
                }, timeout);

                promise.reject(error.body);
            }, {
                fileName: data.audio.substr(data.audio.lastIndexOf('/') + 1),
                fileKey: 'file',
                mimeType: 'audio/x-m4a',
                httpMethod: 'POST',
                chunkedMode: false,
                params: data
            });

            return promise.promise;
        }

        function requestFailed(err) {
            console.info('error', err.config.url, err);

            if (err.data == null || !err.data.error) {
                if (err.status === 200) {
                    toastr.error('Помилка сервера: ' + err.data);
                }
                else if (err.status === -1) {
                    toastr.error('Сервер не доступний');
                }
                else if (err.status === 0) {
                    // $state.go('error.internet');
                    toastr.error('Відсутнє інтернет підключення');
                }
                else if (err.status === 500) {
                    toastr.error('Помилка сервера: ' + err.status + ' ' + err.data.message);
                }
                else {
                    toastr.error('Помилка сервера: ' + err.status + ' ' + err.statusText);
                }
                // toastr.error('XHR Failed: ' + err.status);
            } else {
                toastr.error('Помилка: ' + err.data.error);
            }

            $timeout(function () {
                if (--loading <= 0) {
                    $ionicLoading.hide();
                }
            }, timeout);
            return $q.reject(err.data.error);
        }

        function requestComplete(response) {
            var promise = $q.defer();
            $timeout(function () {
                if (--loading <= 0) {
                    $ionicLoading.hide();
                }
            }, timeout);

            console.info('response complete', response.config.url, response);

            if (!response.data.error) {
                promise.resolve(response.data);
            }
            else {
                promise.reject(response);
            }

            console.log(loading, "stop request");

            return promise.promise;
        }
    }
})();
