/// <reference path="../../../typings/tsd.d.ts" />
module App.Config {
  angular.module('gameon', ['' +
    'ngRoute'
    ])

    .config([
      '$interpolateProvider', '$httpProvider',
      '$routeProvider',

      function($interpolateProvider, $httpProvider,
               $routeProvider) {
        /*==============================================
         = ngRoute config
         ==============================================*/

        $routeProvider
          .when('/', {
            templateUrl: '/static/views/home.html'
          })
          .when('/games', {
            templateUrl: '/static/views/games/list.html',
            controller: 'GamesCtrl as ctrl'
          })
          .otherwise('/games');

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
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] =
          'application/x-www-form-urlencoded;charset=utf-8';

        // The workhorse; converts an object to x-www-form-urlencoded serialization.
        let param = function(obj) {
          let query = '';
          let name;
          let value;
          let fullSubName;
          let subName;
          let subValue;
          let innerObj;
          let i;

          for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
              for (i = 0; i < value.length; ++i) {
                subValue = value[i];
                fullSubName = name + '[' + i + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            } else if (value instanceof Object) {
              for (subName in value) {
                subValue = value[subName];
                fullSubName = name + '[' + subName + ']';
                innerObj = {};
                innerObj[fullSubName] = subValue;
                query += param(innerObj) + '&';
              }
            } else if (value !== undefined && value !== null) {
              query += encodeURIComponent(name) + '=' +
                encodeURIComponent(value) + '&';
            }
          }

          return query.length ?
            query.substr(0, query.length - 1) :
            query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
          return angular.isObject(data) && String(data) !== '[object File]' ?
            param(data) :
            data;
        }];
      }
    ]);
}
