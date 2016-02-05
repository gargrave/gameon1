/// <reference path="../../../../../typings/tsd.d.ts" />
module App.Menus {
  class MenusCtrl {
    menus;

    constructor(menusSvc) {
      this.menus = menusSvc.getMenus();
    }
  }

  angular.module('menus').controller('MenusCtrl', [
    'menusSvc',
    MenusCtrl
  ]);
}
