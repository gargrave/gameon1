/// <reference path="../../../../typings/tsd.d.ts" />
module App.Common {

  import GenericService = App.Common.GenericService;

  /*=============================================
   = interface details
   =============================================*/
  export interface IGenericController<T> {
    working: boolean;
    entries: T[];
    newEntry: T;
    error: string;

    find(): void;
    create(): void;
    initCreateView(): void;
  }

  /*=============================================
   = class implementation
   =============================================*/
  export abstract class GenericController<T> implements IGenericController<T> {
    // whether we are currently working
    working: boolean = false;
    // the list of entries on the server
    entries: T[];
    // the data for a new entry being created
    newEntry: T;
    // any error messages to display
    error: string = '';

    constructor(protected $state,
                protected dataSvc: GenericService<T>,
                protected moduleName: string) {
      const self = this;
      self.entries = [];
      self.newEntry = self.defaultEntry();
    }

    /*=============================================
     = CRUD methods
     =============================================*/
    /**
     * Queries the service for all current entries
     */
    find(): void {
      const self = this;
      self.error = '';
      self.working = true;

      self.dataSvc.query()
        .then(function(res) {
          self.entries = res;
        }, function(err) {
          self.error = err.statusText;
        })
        .finally(function() {
          self.working = false;
        });
    };

    /**
     * Sends the current 'new platform' data to the service to be saved
     */
    create(): void {
      const self = this;
      self.error = '';

      if (self.preValidate()) {
        self.working = true;
        self.dataSvc.save(self.newEntry)
          .then(function(res) {
            // add the new platform into the local list
            self.entries.push(res);
            self.initCreateView();
            self.$state.go(`${self.moduleName}s-list`);
          }, function(err) {
            self.error = err.statusText;
          })
          .finally(function() {
            self.working = false;
          });
      }
    };

    /*=============================================
     = initialization methods
     =============================================*/
    /**
     * Returns an initialized object of the sub-class generic type
     * with default values.
     */
    protected abstract defaultEntry(): T;

    /**
     * Resets the 'new platform' data to default/empty state
     */
    initCreateView(): void {
      const self = this;

      // make sure the entries list has been filled
      if (self.entries.length === 0) {
        self.find();
      }
      self.newEntry = self.defaultEntry();
    };

    /*=============================================
     = validation methods
     =============================================*/
    /**
     * Performs any local validation necessary before sending the new
     * object data to the server.
     *
     * Note that the default implementation simply returns true; any sub-class
     * will need to provide its own implementation to have any actual functionality.
     *
     * @returns {boolean} - True if the data passes local validation
     */
    protected preValidate(): boolean {
      return true;
    }
  }
}
