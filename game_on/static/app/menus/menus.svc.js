var App;
(function (App) {
    var Menus;
    (function (Menus) {
        var MenusSvc = (function () {
            function MenusSvc() {
            }
            MenusSvc.prototype.message = function () {
                return 'this is menus svc.';
            };
            return MenusSvc;
        })();
        angular.module('menus').service('menusSvc', [MenusSvc]);
    })(Menus = App.Menus || (App.Menus = {}));
})(App || (App = {}));
