var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        var PlatformsSvc = (function () {
            function PlatformsSvc($http, $q) {
                this.$http = $http;
                this.$q = $q;
            }
            PlatformsSvc.prototype.query = function () {
                var self = this;
                var deferred = self.$q.defer();
                if (self.platforms) {
                    deferred.resolve(self.platforms);
                }
                else {
                    self.$http.get('/api/platforms')
                        .then(function (res) {
                        self.platforms = res.data.platforms;
                        deferred.resolve(self.platforms);
                    }, function (err) {
                        deferred.reject(err.data);
                    });
                }
                return deferred.promise;
            };
            ;
            PlatformsSvc.prototype.save = function (data) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.post('/api/platforms/add', data)
                    .then(function (res) {
                    deferred.resolve(res.data.platforms[0]);
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            ;
            return PlatformsSvc;
        })();
        Platforms.PlatformsSvc = PlatformsSvc;
        angular.module('platforms').service('platformsSvc', [
            '$http', '$q',
            PlatformsSvc]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
