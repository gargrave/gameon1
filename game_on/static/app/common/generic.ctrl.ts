/// <reference path="../../../../typings/tsd.d.ts" />
module App.Common {

  import GenericService = App.Common.GenericService;

  export abstract class GenericController<T> {
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
    find() {
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
    create() {
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
    protected preValidate(): boolean {
      return true;
    }
  }
}
