/// <reference path="../../../../../typings/tsd.d.ts" />
module App.Games {

  export class GamesSvc extends App.Common.GenericService<App.Games.IGame> {

    constructor(protected $http: ng.IHttpService,
                protected $q: ng.IQService) {
      super($http, $q, 'game');
    }
  }

  angular.module('games').service('gamesSvc', [
    '$http', '$q',
    GamesSvc]);
}
