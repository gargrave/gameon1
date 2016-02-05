/// <reference path="../../../../../typings/tsd.d.ts" />
var App;
(function (App) {
    var Menus;
    (function (Menus) {
        var MenusCtrl = (function () {
            function MenusCtrl(menusSvc) {
                this.menus = menusSvc.getMenus();
            }
            return MenusCtrl;
        })();
        angular.module('menus').controller('MenusCtrl', [
            'menusSvc',
            MenusCtrl
        ]);
    })(Menus = App.Menus || (App.Menus = {}));
})(App || (App = {}));
