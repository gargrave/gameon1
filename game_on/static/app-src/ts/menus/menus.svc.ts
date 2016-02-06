/// <reference path="../../../../../typings/tsd.d.ts" />
module App.Menus {

  /*=============================================
   = helper class implementations
   =============================================*/
  export class ParentMenu implements IParentMenu {
    children: IChildMenuData[];

    constructor(public title: string) {
      this.children = [];
    }
  }

  export class ChildMenuData implements IChildMenuData {
    constructor(public title: string,
                public link: string) {
    }
  }

  /*=============================================
   = main class implementation
   =============================================*/
  class MenusSvc implements IMenusSvc {
    menus: IParentMenu[];

    constructor() {
      this.menus = [];
    }

    /**
     * Returns an IParentMenu instance with the specified title. If one
     * already exists with that title, it is simply returned as is; if none
     * exists, a new one is created with the specified title.
     *
     * @param title The title to use for the ParentMenu
     * @returns {IParentMenu} - The ParentMenu with the specified title
     */
    getDropdownParent(title: string): IParentMenu {
      const self = this;
      // see if there is an existing parent menu with this title
      let menu = _.find(self.menus, function(m) {
        return (<IParentMenu>m).title === title;
      });
      // if not, create one with this title
      if (!menu) {
        menu = new ParentMenu(title);
        self.menus.push(menu);
      }
      return menu;
    }

    /**
     * Adds a child item to the parent menu with the specified title. If the
     * parent menu does not yet exist, a new one will be created.
     *
     * If a child item with the specified title already exists, nothing will be done.
     *
     * @param parent {string} - The title of the parent menu
     * @param child {IChildMenuData} - The data for the child item to add
     */
    addDropdownChild(parent: string, child: IChildMenuData): void {
      const self = this;
      let menu = self.getDropdownParent(parent);
      let title = child.title;

      // see if the parent has any children already matching the specified title
      let existing = _.find(menu.children, function(c) {
        return (<IChildMenuData>c).title === title;
      });

      // if not, add the child data
      // otherwise do nothing
      if (existing === undefined) {
        menu.children.push(child);
      }
    }

    /**
     * Returns all defined menus.
     *
     * @returns {IParentMenu[]} All of the menu data defined
     */
    getMenus(): IParentMenu[] {
      return this.menus;
    }
  }

  angular.module('menus').service('menusSvc', [MenusSvc]);
}
