/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {

  /*=============================================
   = interface definitions
   =============================================*/
  export interface IPlatform {
    name: string;
  }

  /*=============================================
   = class implementation
   =============================================*/
  export class PlatformsSvc extends App.Common.GenericService<IPlatform> {

    constructor(protected $http: ng.IHttpService,
                protected $q: ng.IQService) {
      super($http, $q, 'platform');
    }
  }

  angular.module('platforms').service('platformsSvc', [
    '$http', '$q',
    PlatformsSvc]);
}
