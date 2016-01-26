var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        angular.module('gameon').service('platformsSvc', [
            '$http', '$q',
            function ($http, $q) {
                var vm = this;
                vm.query = function () {
                    var deferred = $q.defer();
                    $http.get('/api/platforms')
                        .then(function (res) {
                        deferred.resolve(res.data);
                    });
                    return deferred.promise;
                };
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
