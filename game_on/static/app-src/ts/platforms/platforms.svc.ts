/// <reference path="../../../../../typings/tsd.d.ts" />
module App.Platforms {

  export class PlatformsSvc extends App.Common.GenericService<App.Platforms.IPlatform> {

    constructor(protected $http: ng.IHttpService,
                protected $q: ng.IQService) {
      super($http, $q, 'platform');
    }
  }

  angular.module('platforms').service('platformsSvc', [
    '$http', '$q',
    PlatformsSvc]);
}
