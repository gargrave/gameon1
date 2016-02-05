/// <reference path="../../../../../typings/tsd.d.ts" />
module App.Games {

  import IGame = App.Games.IGame;

  /*=============================================
   = class implementation
   =============================================*/
  export class GamesSvc extends App.Common.GenericService<IGame> {

    constructor(protected $http: ng.IHttpService,
                protected $q: ng.IQService) {
      super($http, $q, 'game');
    }
  }

  angular.module('games').service('gamesSvc', [
    '$http', '$q',
    GamesSvc]);
}
