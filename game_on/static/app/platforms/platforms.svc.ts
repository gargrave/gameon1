/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {

  /*=============================================
   = interface definitions
   =============================================*/

  export interface IPlatform {
    name: string;
  }

  export interface IPlatformData {
    platforms: any;
  }

  /*=============================================
   = class implementation
   =============================================*/

  export class PlatformsSvc {

    private platforms: IPlatform[];

    constructor(protected $http: ng.IHttpService,
                protected $q: ng.IQService) {
    }

    query(): ng.IPromise<IPlatform[]> {
      const self = this;
      let deferred: ng.IDeferred<IPlatform[]> = self.$q.defer();

      if (self.platforms) {
        deferred.resolve(self.platforms);
      } else {
        self.$http.get('/api/platforms')
          .then(function(res) {
            self.platforms = (<IPlatformData>res.data).platforms;
            deferred.resolve(self.platforms);
          }, function(err) {
            deferred.reject(err.data);
          });
      }
      return deferred.promise;
    };

    save(data): ng.IPromise<IPlatform> {
      const self = this;
      let deferred: ng.IDeferred<IPlatform> = self.$q.defer();

      self.$http.post('/api/platforms/add', data)
        .then(function(res) {
          deferred.resolve((<IPlatformData>res.data).platforms[0]);
        }, function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
  }

  angular.module('platforms').service('platformsSvc', [
    '$http', '$q',
    PlatformsSvc]);
}
