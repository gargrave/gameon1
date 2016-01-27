var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        angular.module('games', [
            'ui.router'
        ])
            .config(['$stateProvider',
            function ($stateProvider) {
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
                });
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
