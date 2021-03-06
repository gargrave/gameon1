/// <reference path="../../../../../typings/tsd.d.ts" />
var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        angular.module('platforms', [
            'ui.router'
        ])
            .config([
            '$stateProvider',
            function ($stateProvider) {
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
                })
                    .state('platforms-detail', {
                    url: '/platforms/:id',
                    templateUrl: '/static/views/platforms/detail.html',
                    controller: 'PlatformsCtrl as ctrl'
                })
                    .state('platforms-edit', {
                    url: '/platforms/:id/edit',
                    templateUrl: '/static/views/platforms/edit.html',
                    controller: 'PlatformsCtrl as ctrl'
                });
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
