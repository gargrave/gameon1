/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {
  export class PlatformsSvc {

    private platforms;

    constructor(protected $http, protected $q) {
    }

    query() {
      const self = this;
      let deferred = self.$q.defer();

      if (self.platforms) {
        deferred.resolve(self.platforms);
      } else {
        self.$http.get('/api/platforms')
          .then(function(res) {
            self.platforms = res.data.platforms;
            deferred.resolve(self.platforms);
          }, function(err) {
            deferred.reject(err.data);
          });
      }
      return deferred.promise;
    };

    save(data) {
      const self = this;
      let deferred = self.$q.defer();

      self.$http.post('/api/platforms/add', data)
        .then(function(res) {
          deferred.resolve(res.data.platform[0]);
        }, function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
  }

  angular.module('gameon').service('platformsSvc', [
    '$http', '$q',
    PlatformsSvc]);
}
