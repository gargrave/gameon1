declare module App.Common {

  export interface IDbEntry {
    id?: number;
    created?: string;
    modified?: string;
  }

  export interface IGenericController<T> {
    working: boolean;
    entries: T[];
    activeEntry: T;
    newEntry: T;
    error: string;

    create(): void;
    find(): void;
    findOne(): void;
    update(): void;
    remove(): void;

    initCreateView(): void;

    gotoListView(): void;
  }
}
