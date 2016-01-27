/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {
  angular.module('platforms', [
      'ui.router'
    ])

    .config(['$stateProvider',

      function($stateProvider) {
        $stateProvider
          .state('platforms-list', {
            url: '/platforms',
            templateUrl: '/static/views/platforms/list.html',
            controller: 'PlatformsCtrl as ctrl'
          })
          .state('platforms-create', {
            url: '/platforms/create',
            templateUrl: '/static/views/platforms/create.html',
            controller: 'PlatformsCtrl as ctrl'
          });
      }
    ]);
}
