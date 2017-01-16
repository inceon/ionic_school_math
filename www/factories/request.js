;(function () {
    'use strict';
    angular
        .module('factory.request', [])
        .factory('http', http);

    http.$inject = ['$http', '$sessionStorage', 'toastr', '$ionicLoading', '$q', '$state'];

    function http($http, $sessionStorage, toastr, $ionicLoading, $q, $state) {

        return {
            get: function (url, data) {
                return request('GET', url, data);
            },
            post: function (url, data) {
                return request('POST', url, data);
            },
            delete: function (url, data) {
                return request('DELETE', url, data);
            },
            put: function (url, data) {
                return request('PUT', url, data);
            },
            file: function (url, data) {
                return requestFile(url, data);
            },
            audio: function (url, data) {
                return requestAudio(url, data);
            }
        };

        function request(method, url, data) {
            $ionicLoading.show({
                templateUrl: 'views/lazyload/lazyload.html',
                duration: 2000
            });
            var config = {
                dataType: 'json',
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=UTF-8'
                }
            };

            if (method === 'GET') {
                config.params = data;
            }
            else {
                config.data = data;
            }

            if ($sessionStorage.auth_key) {
                config.url = url + '?auth_key=' + $sessionStorage.auth_key + '&lang=uk-UA';
            }
            else {
                config.url = url+ '?lang=uk-UA';
            }

            return $http(config)
                .then(requestComplete)
                .catch(requestFailed);
        }

        function requestFile(url, data) {
            $ionicLoading.show({
                templateUrl: 'views/lazyload/lazyload.html',
                duration: 2000
            });
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
                templateUrl: 'views/lazyload/lazyload.html',
                duration: 2000
            });

            if ($sessionStorage.auth_key) {
                url = url + '?auth_key=' + $sessionStorage.auth_key;
            }

            var ft = new FileTransfer();

            var promise = $q.defer();
            ft.upload(data.audio, encodeURI(url), function (response) {
                $ionicLoading.hide();

                console.info('response complete', JSON.parse(response.response));

                promise.resolve(JSON.parse(response.response));
            }, function (error) {
                console.log(error);
                $ionicLoading.hide();
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
                    throw "Internet";
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

            $ionicLoading.hide();
            return $q.reject(err.data.error);
        }

        function requestComplete(response) {
            var promise = $q.defer();
            $ionicLoading.hide();

            console.info('response complete', response.config.url, response);

            if (!response.data.error) {
                promise.resolve(response.data);
            }
            else {
                promise.reject(response);
            }

            return promise.promise;
        }
    }
})();
