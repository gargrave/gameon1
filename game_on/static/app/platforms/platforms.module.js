var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        var moduleName = "platforms";
        angular.module("" + moduleName, [
            'ui.router'
        ])
            .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state(moduleName + "-list", {
                    url: "/" + moduleName,
                    templateUrl: "/static/views/" + moduleName + "/list.html",
                    controller: "PlatformsCtrl as ctrl"
                })
                    .state(moduleName + "-create", {
                    url: "/" + moduleName + "/create",
                    templateUrl: "/static/views/" + moduleName + "/create.html",
                    controller: "PlatformsCtrl as ctrl"
                });
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
