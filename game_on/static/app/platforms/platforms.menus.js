var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        var ChildMenuData = App.Menus.ChildMenuData;
        angular.module('platforms').run([
            'menusSvc',
            function (menusSvc) {
                var menu = 'Platforms';
                menusSvc.getDropdownParent(menu);
                menusSvc.addDropdownChild(menu, new ChildMenuData('List Platforms', 'platforms-list'));
                menusSvc.addDropdownChild(menu, new ChildMenuData('Add a Platform', 'platforms-create'));
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
