module App.Menus {
  class MenusSvc {
    constructor() {
    }

    message(): string {
      return 'this is menus svc.';
    }
  }

  angular.module('menus').service('menusSvc', [MenusSvc]);
}
