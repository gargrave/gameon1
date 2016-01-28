/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {

  import ChildMenuData = App.Menus.ChildMenuData;

  angular.module('platforms').run([
    'menusSvc',

    function(menusSvc: App.Menus.IMenusSvc) {
      const menu = 'Platforms';
      menusSvc.getDropdownParent(menu);
      menusSvc.addDropdownChild(menu, new ChildMenuData('List Platforms', 'platforms-list'));
      menusSvc.addDropdownChild(menu, new ChildMenuData('Add a Platform', 'platforms-create'));
    }
  ]);
}
