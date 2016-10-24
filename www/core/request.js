;(function () {
    'use strict';
    angular
        .module('factory.request', [])
        .factory('http', http);

    http.$inject = ['$http', '$sessionStorage', 'toastr', '$ionicLoading', '$q'];

    function http($http, $sessionStorage, toastr, $ionicLoading, $q) {

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
            }
        };

        function request(method, url, data) {
            $ionicLoading.show({templateUrl: 'views/lazyload/lazyload.html'});
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
                config.url = url + '?auth_key=' + $sessionStorage.auth_key;
            }
            else {
                config.url = url;
            }

            return $http(config)
                .then(requestComplete)
                .catch(requestFailed);
        }

        function requestFile(url, data) {
            $ionicLoading.show({templateUrl: 'views/lazyload/lazyload.html'});
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

        function requestFailed(err) {
            console.info('error', err.config.url, err);
            $ionicLoading.hide();

            if (err.data.error) {
                if (err.status === 200) {
                    toastr.error('Server Error: ' + err.data);
                }
                else if (err.status === -1) {
                    toastr.error('Server unavailable');
                }
                else if (err.status === 500) {
                    toastr.error('Server Error: ' + err.status + ' ' + err.data.message);
                }
                else {
                    toastr.error('Server Error: ' + err.status + ' ' + err.statusText);
                }
                toastr.error('XHR Failed: ' + err.status);
            } else {
                toastr.error('Error: ' + err.data.error);
            }
            return $q.reject(err.data.error);
        }

        function requestComplete(response) {
            var promise = $q.defer();

            console.info('response complete', response.config.url, response);
            $ionicLoading.hide();

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