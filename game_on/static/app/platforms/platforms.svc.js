var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        angular.module('gameon').service('platformsSvc', [
            '$http', '$q',
            function ($http, $q) {
                var vm = this;
                var platforms;
                vm.query = function () {
                    var deferred = $q.defer();
                    if (platforms) {
                        deferred.resolve(platforms);
                    }
                    else {
                        $http.get('/api/platforms')
                            .then(function (res) {
                            platforms = res.data.platforms;
                            deferred.resolve(platforms);
                        }, function (err) {
                            deferred.reject(err.data);
                        });
                    }
                    return deferred.promise;
                };
                vm.save = function (data) {
                    var deferred = $q.defer();
                    $http.post('/api/platforms/add', data)
                        .then(function (res) {
                        deferred.resolve(res.data.platform[0]);
                    }, function (err) {
                        deferred.reject(err);
                    });
                    return deferred.promise;
                };
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
