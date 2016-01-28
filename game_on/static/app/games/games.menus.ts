/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {

  import ChildMenuData = App.Menus.ChildMenuData;

  angular.module('games').run([
    'menusSvc',

    function(menusSvc: App.Menus.IMenusSvc) {
      const menu = 'Games';
      menusSvc.getDropdownParent(menu);
      menusSvc.addDropdownChild(menu, new ChildMenuData('List Games', 'games-list'));
      menusSvc.addDropdownChild(menu, new ChildMenuData('Add a Game', 'games-create'));
    }
  ]);
}
