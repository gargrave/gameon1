/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {
  angular.module('platforms', [
      'ui.router'
    ])
    .config([
      '$stateProvider',

      function($stateProvider) {
        $stateProvider
        // list view
          .state('platforms-list', {
            url: '/platforms',
            templateUrl: '/static/views/platforms/list.html',
            controller: 'PlatformsCtrl as ctrl'
          })
          // create view
          .state('platforms-create', {
            url: '/platforms/create',
            templateUrl: '/static/views/platforms/create.html',
            controller: 'PlatformsCtrl as ctrl'
          })
          // detail view
          .state('platforms-detail', {
            url: '/platforms/:id',
            templateUrl: '/static/views/platforms/detail.html',
            controller: 'PlatformsCtrl as ctrl'
          })
          // edit view
          .state('platforms-edit', {
            url: '/platforms/:id/edit',
            templateUrl: '/static/views/platforms/edit.html',
            controller: 'PlatformsCtrl as ctrl'
          });
      }
    ]);
}
