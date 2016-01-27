var App;
(function (App) {
    var Config;
    (function (Config) {
        angular.module('gameon', [
            'ui.router',
            'platforms'
        ])
            .config([
            '$interpolateProvider', '$httpProvider',
            '$stateProvider', '$urlRouterProvider',
            function ($interpolateProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('home', {
                    url: '/',
                    templateUrl: '/static/views/home.html'
                })
                    .state('games-list', {
                    url: '/games',
                    templateUrl: '/static/views/games/list.html',
                    controller: 'GamesCtrl as ctrl'
                })
                    .state('games-create', {
                    url: '/games/add',
                    templateUrl: '/static/views/games/create.html',
                    controller: 'GamesCtrl as ctrl'
                });
                $urlRouterProvider.otherwise('/');
                $interpolateProvider.startSymbol('{A');
                $interpolateProvider.endSymbol('A}');
                $httpProvider.defaults.xsrfCookieName = 'csrftoken';
                $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
                $httpProvider.defaults.headers.post['Content-Type'] =
                    'application/x-www-form-urlencoded;charset=utf-8';
                var param = function (obj) {
                    var query = '';
                    var name;
                    var value;
                    var fullSubName;
                    var subName;
                    var subValue;
                    var innerObj;
                    var i;
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
                        }
                        else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        }
                        else if (value !== undefined && value !== null) {
                            query += encodeURIComponent(name) + '=' +
                                encodeURIComponent(value) + '&';
                        }
                    }
                    return query.length ?
                        query.substr(0, query.length - 1) :
                        query;
                };
                $httpProvider.defaults.transformRequest = [function (data) {
                        return angular.isObject(data) && String(data) !== '[object File]' ?
                            param(data) :
                            data;
                    }];
            }
        ]);
    })(Config = App.Config || (App.Config = {}));
})(App || (App = {}));
