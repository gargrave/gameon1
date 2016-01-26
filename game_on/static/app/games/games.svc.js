var App;
(function (App) {
    var Games;
    (function (Games) {
        angular.module('gameon').service('gamesSvc', [
            '$http', '$q',
            function ($http, $q) {
                var vm = this;
                vm.query = function () {
                    var deferred = $q.defer();
                    $http.get('/api/games')
                        .then(function (res) {
                        deferred.resolve(res.data);
                    });
                    return deferred.promise;
                };
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
