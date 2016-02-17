declare module App.Menus {

  export interface IParentMenu {
    title: string;
    order: number;
    children: IChildMenuData[];
  }

  export interface IChildMenuData {
    title: string;
    link: string;
  }

  export interface IMenusSvc {
    getDropdownParent(title: string, order: number): IParentMenu;
    addDropdownChild(parent: string, child: IChildMenuData): void;
    getMenus(): IParentMenu[];
  }
}
