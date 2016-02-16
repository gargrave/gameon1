/// <reference path="../../../../../typings/tsd.d.ts" />
module App.Common {

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

    // string for filtering entry listings
    filterText: string = '';
    // string for sorting entry listings
    sortText: string = 'startDate';

    // the data that will actually be sent to the server for write requests
    // this is useful for objects that need to be handled differently on the
    // server than they do in the client
    protected submissionData;

    constructor(protected $scope,
                protected $window: ng.IWindowService,
                protected $stateParams: ng.ui.IStateParamsService,
                protected $state: ng.ui.IStateService,
                protected dataSvc: App.Common.GenericService<T>,
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

      self.buildSubmissionData();
      if (self.preValidate()) {
        self.working = true;
        self.dataSvc.save(self.submissionData)
          .then(function(res) {
            // add the new platform into the local list
            self.entries.push(res);
            self.initCreateView();
            self.gotoDetailView((<IDbEntry>res).id);
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
          self.initListView();
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
          self.newEntry = angular.copy(self.activeEntry);
        }, function(err) {
          // TODO use ngmessages to show this upon return to the list view
          self.error = `The entry with id# ${id} could not be found.`;
          self.gotoListView();
        })
        .finally(function() {
          self.working = false;
        });
    }

    update(): void {
      const self = this;
      const id: number = (<IDbEntry>self.activeEntry).id;
      self.error = '';

      self.buildSubmissionData();
      if (self.preValidate()) {
        self.working = true;
        self.dataSvc.update(self.submissionData)
          .then(function(res) {
            // add the new platform into the local list
            self.activeEntry = res;
            self.gotoDetailView(id);
          }, function(err) {
            self.error = err.statusText;
          })
          .finally(function() {
            self.working = false;
          });
      }
    }

    /**
     * Sends a query to the server to delete the currently-active entry.
     */
    remove(): void {
      const self = this;

      // show confirm and early-out if user declines
      if (self.$window.confirm('Are you sure you want to delete this entry?')) {
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
    }

    /**
     * Called after the list view has successfully been initialized with the
     * response from the server. Anything a controller needs to do to the list
     * of entries before it is used can be done here.
     *
     * Note that this is only called after a successful API query--in case of errors,
     * it will not be called.
     */
    initListView(): void {
    }

    /**
     * Builds the data that will be sent to the server for write requests.
     * By default, this is simply a copy of 'newEntry', but any sub-class
     * can override to provide its own specifics.
     */
    protected buildSubmissionData(): void {
      this.submissionData = angular.copy(this.newEntry);
    }

    /**
     * Sets the string to use for sorting the entry list. If the string provided
     * is the current sorting text, a minus sign will be appended to the front to
     * reverse the order.
     *
     * @param text {string} The new value of the sorting text
     */
    setSortText(text: string): void {
      if (this.sortText === text) {
        this.sortText = `-${text}`;
      } else {
        this.sortText = text;
      }
    }

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
      const self = this;
      self.$state.go(`${this.moduleName}s-list`);
    }

    gotoDetailView(id: number): void {
      const self = this;
      self.$state.go(`${self.moduleName}s-detail`, {id: id});
    }
  }
}
