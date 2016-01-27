var App;
(function (App) {
    var Menus;
    (function (Menus) {
        var MenusCtrl = (function () {
            function MenusCtrl() {
                this.menus = [
                    {
                        title: 'Arts',
                        items: [
                            {
                                title: 'Art List',
                                link: 'games-list'
                            },
                            {
                                title: 'Add an Art',
                                link: 'games-create'
                            }
                        ]
                    },
                    {
                        title: 'Farts',
                        items: [
                            {
                                title: 'Art List',
                                link: 'games-list'
                            },
                            {
                                title: 'Add an Art',
                                link: 'games-create'
                            }
                        ]
                    },
                    {
                        title: 'Crafts',
                        items: [
                            {
                                title: 'Art List',
                                link: 'games-list'
                            },
                            {
                                title: 'Add an Art',
                                link: 'games-create'
                            }
                        ]
                    }
                ];
            }
            return MenusCtrl;
        })();
        angular.module('menus').controller('MenusCtrl', [MenusCtrl]);
    })(Menus = App.Menus || (App.Menus = {}));
})(App || (App = {}));
