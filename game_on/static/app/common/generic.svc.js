var App;
(function (App) {
    var Common;
    (function (Common) {
        var GenericService = (function () {
            function GenericService($http, $q, moduleName) {
                this.$http = $http;
                this.$q = $q;
                this.moduleName = moduleName;
                this.needsUpdate = false;
            }
            GenericService.prototype.query = function () {
                var self = this;
                var url = "/api/" + self.moduleName + "s";
                var deferred = self.$q.defer();
                if (self.entries && !self.needsUpdate) {
                    deferred.resolve(self.entries);
                }
                else {
                    self.$http.get(url)
                        .then(function (res) {
                        self.entries = res.data.entries;
                        self.needsUpdate = false;
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
                var url = "/api/" + self.moduleName + "s/" + id;
                var deferred = self.$q.defer();
                self.$http.get(url)
                    .then(function (res) {
                    deferred.resolve(res.data.entries[0]);
                }, function (err) {
                    deferred.reject(err.data);
                });
                return deferred.promise;
            };
            GenericService.prototype.save = function (data) {
                var self = this;
                var url = "/api/" + self.moduleName + "s/create";
                var deferred = self.$q.defer();
                self.$http.post(url, data)
                    .then(function (res) {
                    self.needsUpdate = true;
                    deferred.resolve(res.data.entries[0]);
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            ;
            GenericService.prototype.update = function (data) {
                var self = this;
                var url = "/api/" + self.moduleName + "s/update";
                var deferred = self.$q.defer();
                self.$http.post(url, data)
                    .then(function (res) {
                    self.needsUpdate = true;
                    deferred.resolve(res.data.entries[0]);
                }, function (err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            };
            ;
            GenericService.prototype.remove = function (id) {
                var self = this;
                var url = "/api/" + self.moduleName + "s/delete";
                var deferred = self.$q.defer();
                self.$http.post(url, { id: id })
                    .then(function (res) {
                    self.needsUpdate = true;
                    deferred.resolve(null);
                });
                return deferred.promise;
            };
            return GenericService;
        })();
        Common.GenericService = GenericService;
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
