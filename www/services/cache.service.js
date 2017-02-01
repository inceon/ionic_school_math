;(function () {
    'use strict';

    angular
        .module('model.cache', [])
        .service('cache', cache);

    cache.$inject = ['http', 'url', 'CacheFactory', '$localStorage'];
    function cache(http, url, CacheFactory, $localStorage) {

        if ($localStorage.cache == undefined) {
            $localStorage.cache = {};
        }

        return {
            check: check
        };

        function deleteCache(key) {
            var cache = CacheFactory.get('defaultCache');
            angular.forEach(cache.keys(), function (item) {
                if (item.search(key) != -1) {
                    cache.remove(item);
                }
            })
        }

        function check(id) {
            http.get(url.site.check)
                .then(function (res) {
                    angular.forEach(res, function (item, key) {

                        if ($localStorage.cache[key]) {
                            if ($localStorage.cache[key] < item) {
                                deleteCache(key.replace('_', '-'));
                                $localStorage.cache[key] = item;
                                console.info('deleted cache ', key);
                            }
                        } else {
                            $localStorage.cache[key] = item;
                        }

                    });
                });
        }

    }
})();
