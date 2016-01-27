/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {

  const moduleName = `platforms`;

  angular.module(`${moduleName}`, [
      'ui.router'
    ])
    .config(['$stateProvider',
      function($stateProvider) {
        $stateProvider
          .state(`${moduleName}-list`, {
            url: `/${moduleName}`,
            templateUrl: `/static/views/${moduleName}/list.html`,
            controller: `PlatformsCtrl as ctrl`
          })
          .state(`${moduleName}-create`, {
            url: `/${moduleName}/create`,
            templateUrl: `/static/views/${moduleName}/create.html`,
            controller: `PlatformsCtrl as ctrl`
          });
      }
    ]);
}
