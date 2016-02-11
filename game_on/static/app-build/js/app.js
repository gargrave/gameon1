/// <reference path="../../../../typings/tsd.d.ts" />
var App;
(function (App) {
    var Config;
    (function (Config) {
        angular.module('gameon', [
            'ui.router',
            'ngMessages',
            'common',
            'menus',
            'platforms',
            'games'
        ])
            .config([
            '$interpolateProvider', '$httpProvider',
            '$stateProvider', '$urlRouterProvider',
            function ($interpolateProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('home', {
                    url: '/',
                    templateUrl: '/static/views/home.html'
                });
                $urlRouterProvider.otherwise('/');
                $interpolateProvider.startSymbol('{A');
                $interpolateProvider.endSymbol('A}');
                $httpProvider.defaults.xsrfCookieName = 'csrftoken';
                $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
            }
        ]);
    })(Config = App.Config || (App.Config = {}));
})(App || (App = {}));
