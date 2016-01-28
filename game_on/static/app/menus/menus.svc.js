var App;
(function (App) {
    var Menus;
    (function (Menus) {
        var ParentMenu = (function () {
            function ParentMenu(title) {
                this.title = title;
                this.children = [];
            }
            return ParentMenu;
        })();
        Menus.ParentMenu = ParentMenu;
        var ChildMenuData = (function () {
            function ChildMenuData(title, link) {
                this.title = title;
                this.link = link;
            }
            return ChildMenuData;
        })();
        Menus.ChildMenuData = ChildMenuData;
        var MenusSvc = (function () {
            function MenusSvc() {
                this.menus = [];
            }
            MenusSvc.prototype.getDropdownParent = function (title) {
                var self = this;
                var menu = _.find(self.menus, function (m) {
                    return m.title === title;
                });
                if (!menu) {
                    menu = new ParentMenu(title);
                    self.menus.push(menu);
                }
                return menu;
            };
            MenusSvc.prototype.addDropdownChild = function (parent, child) {
                var self = this;
                var menu = self.getDropdownParent(parent);
                var title = child.title;
                var existing = _.find(menu.children, function (c) {
                    return c.title === title;
                });
                if (existing === undefined) {
                    menu.children.push(child);
                }
            };
            MenusSvc.prototype.getMenus = function () {
                return this.menus;
            };
            return MenusSvc;
        })();
        angular.module('menus').service('menusSvc', [MenusSvc]);
    })(Menus = App.Menus || (App.Menus = {}));
})(App || (App = {}));
