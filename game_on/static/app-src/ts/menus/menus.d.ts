declare module App.Menus {

  export interface IParentMenu {
    title: string;
    children: IChildMenuData[];
  }

  export interface IChildMenuData {
    title: string;
    link: string;
  }

  export interface IMenusSvc {
    getDropdownParent(title: string): IParentMenu;
    addDropdownChild(parent: string, child: IChildMenuData): void;
    getMenus(): IParentMenu[];
  }
}
