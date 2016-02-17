/// <reference path="../../../../../typings/tsd.d.ts" />
var App;
(function (App) {
    var Games;
    (function (Games) {
        var ChildMenuData = App.Menus.ChildMenuData;
        angular.module('games').run([
            'menusSvc',
            function (menusSvc) {
                var menu = 'Games';
                menusSvc.getDropdownParent(menu, 0);
                menusSvc.addDropdownChild(menu, new ChildMenuData('List Games', 'games-list'));
                menusSvc.addDropdownChild(menu, new ChildMenuData('Add a Game', 'games-create'));
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
