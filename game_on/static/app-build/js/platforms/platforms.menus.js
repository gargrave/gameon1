/// <reference path="../../../../../typings/tsd.d.ts" />
var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        var ChildMenuData = App.Menus.ChildMenuData;
        angular.module('platforms').run([
            'menusSvc',
            function (menusSvc) {
                var menu = 'Platforms';
                menusSvc.getDropdownParent(menu, 1);
                menusSvc.addDropdownChild(menu, new ChildMenuData('List Platforms', 'platforms-list'));
                menusSvc.addDropdownChild(menu, new ChildMenuData('Add a Platform', 'platforms-create'));
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
