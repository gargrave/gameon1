/// <reference path="../../../../typings/tsd.d.ts" />
module App.Config {
  angular.module('gameon', [
      'ui.router',
      'menus',
      'platforms',
      'games'
    ])

    .config([
      '$interpolateProvider', '$httpProvider',
      '$stateProvider', '$urlRouterProvider',

      function($interpolateProvider, $httpProvider,
               $stateProvider, $urlRouterProvider) {
        /*==============================================
         = ngRoute config
         ==============================================*/
        $stateProvider
          .state('home', {
            url: '/',
            templateUrl: '/static/views/home.html'
          });
        $urlRouterProvider.otherwise('/');

        /*==============================================
         = set up custom interpolation handlebars, so that
         = NG can work together with Django templates
         ==============================================*/
        $interpolateProvider.startSymbol('{A');
        $interpolateProvider.endSymbol('A}');

        /*==============================================
         = set up Django CSRF token for NG's AJAX calls
         ==============================================*/
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
      }
    ]);
}
