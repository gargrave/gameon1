/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {
  angular.module('games', [
      'ui.router'
    ])
    .config([
      '$stateProvider',

      function($stateProvider) {
        $stateProvider
          .state('games-list', {
            url: '/games',
            templateUrl: '/static/views/games/list.html',
            controller: 'GamesCtrl as ctrl'
          })
          .state('games-create', {
            url: '/games/create',
            templateUrl: '/static/views/games/create.html',
            controller: 'GamesCtrl as ctrl'
          })
          .state('games-detail', {
            url: '/games/:id',
            templateUrl: '/static/views/games/detail.html',
            controller: 'GamesCtrl as ctrl'
          });
      }
    ]);
}
