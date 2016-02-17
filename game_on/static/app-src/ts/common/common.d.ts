declare module App.Common {

  /**
   * A wrapper for objects that will be written to and read from the DB. Contains
   * optional properties that are likely to necessary on all types of entries.
   */
  export interface IDbEntry {
    id?: number;
    created?: string;
    modified?: string;
  }

  /**
   * A wrapper for creating objects with the properties used by angular for form validation
   */
  export interface IFormWrapper {
    $submitted: boolean;
    $valid: boolean;
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
    initEditView(): void;
    setSortText(text: string): void;

    gotoListView(): void;
    gotoDetailView(id: number): void;
  }
}
