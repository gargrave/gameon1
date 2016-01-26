var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        angular.module('gameon').service('platformsSvc', [
            '$http', '$q',
            function ($http, $q) {
                var vm = this;
                vm.query = function () {
                    var fakeres = {
                        data: [
                            { name: 'Xbox One' },
                            { name: 'PS3' }
                        ]
                    };
                    var deferred = $q.defer();
                    deferred.resolve(fakeres);
                    return deferred.promise;
                };
            }]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
