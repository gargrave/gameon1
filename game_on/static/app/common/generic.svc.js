var App;
(function (App) {
    var Common;
    (function (Common) {
        var GenericService = (function () {
            function GenericService($http, $q, moduleName) {
                this.$http = $http;
                this.$q = $q;
                this.moduleName = moduleName;
            }
            GenericService.prototype.query = function () {
                var self = this;
                var deferred = self.$q.defer();
                if (self.entries) {
                    deferred.resolve(self.entries);
                }
                else {
                    self.$http.get("/api/" + self.moduleName + "s")
                        .then(function (res) {
                        self.entries = res.data.entries;
                        deferred.resolve(self.entries);
                    }, function (err) {
                        deferred.reject(err.data);
                    });
                }
                return deferred.promise;
            };
            ;
            GenericService.prototype.get = function (id) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.get("/api/" + self.moduleName + "s/" + id)
                    .then(function (res) {
                    self.activeEntry = res.data.entries[0];
                    deferred.resolve(self.activeEntry);
                }, function (err) {
                    deferred.reject(err.data);
                });
                return deferred.promise;
            };
            GenericService.prototype.save = function (data) {
                var self = this;
                var deferred = self.$q.defer();
                self.$http.post("/api/" + self.moduleName + "s/create", data)
                    .then(function (res) {
                    deferred.resolve(res.data.entries[0]);
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            ;
            return GenericService;
        })();
        Common.GenericService = GenericService;
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
