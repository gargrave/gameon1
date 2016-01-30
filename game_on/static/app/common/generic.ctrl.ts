/// <reference path="../../../../typings/tsd.d.ts" />
module App.Common {

  import GenericService = App.Common.GenericService;

  /*=============================================
   = interface details
   =============================================*/
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
    remove(): void;

    initCreateView(): void;

    gotoListView(): void;
  }

  /*=============================================
   = class implementation
   =============================================*/
  export abstract class GenericController<T> implements IGenericController<T> {
    // whether we are currently working
    working: boolean = false;
    // the list of entries on the server
    entries: T[];
    // the entry we are viewing/editing/etc.
    activeEntry: T;
    // the data for a new entry being created
    newEntry: T;
    // any error messages to display
    error: string = '';

    constructor(protected $stateParams: ng.ui.IStateParamsService,
                protected $state: ng.ui.IStateService,
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

            // get the id for the new entry, and redirect to its details page
            let id = (<IDbEntry>res).id;
            self.$state.go(`${self.moduleName}s-detail`, {id: id});
          }, function(err) {
            self.error = err.statusText;
          })
          .finally(function() {
            self.working = false;
          });
      }
    };

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
     * Queries the service for a single entry with the specified id.
     *
     * ID should be passed in as part of the URL, e.g.:
     * /api/[module]/12345
     */
    findOne(): void {
      const self = this;
      self.error = '';
      self.working = true;

      let id = self.$stateParams['id'];

      self.dataSvc.get(id)
        .then(function(res) {
          self.activeEntry = res;
        }, function(err) {
          // TODO use ngmessages to show this upon return to the list view
          self.error = `The entry with id# ${id} could not be found.`;
          self.gotoListView();
        })
        .finally(function() {
          self.working = false;
        });
    }

    /**
     * Sends a query to the server to delete the currently-active entry.
     */
    remove(): void {
      const self = this;
      self.error = '';
      self.working = true;

      let id = self.$stateParams['id'];

      self.dataSvc.remove(id)
        .then(function(res) {
          // remove the entry from the local list
          _.remove(self.entries, function(e) {
            return (<IDbEntry>e).id === id;
          });
          self.gotoListView();
        }, function(err) {
          self.error = err.statusText;
        })
        .finally(function() {
          self.working = false;
        });
    }

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

    /*=============================================
     = state shortcuts
     =============================================*/
    gotoListView(): void {
      this.$state.go(`${this.moduleName}s-list`);
    }
  }
}
