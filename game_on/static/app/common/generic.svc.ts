/// <reference path="../../../../typings/tsd.d.ts" />
module App.Common {

  /*=============================================
   = interface definitions
   =============================================*/
  export interface IApiResponse {
    entries: any;
  }

  export interface IGenericService<T> {
    query(): ng.IPromise<T[]>;
    get(id: number): ng.IPromise<T>;
    save(data): ng.IPromise<T>;
  }

  /*=============================================
   = class implementation
   =============================================*/
  export abstract class GenericService<T> implements IGenericService<T> {

    private entries: T[];
    private activeEntry: T;

    constructor(protected $http: ng.IHttpService,
                protected $q: ng.IQService,
                protected moduleName: string) {
    }

    /**
     * Query the db and returns an Array of all entries.
     */
    query(): ng.IPromise<T[]> {
      const self = this;
      let deferred: ng.IDeferred<T[]> = self.$q.defer();

      if (self.entries) {
        deferred.resolve(self.entries);
      } else {
        self.$http.get(`/api/${self.moduleName}s`)
          .then(function(res) {
            self.entries = (<IApiResponse>res.data).entries;
            deferred.resolve(self.entries);
          }, function(err) {
            deferred.reject(err.data);
          });
      }
      return deferred.promise;
    };

    /**
     * Query the db and returns a single entry matching the specified ID.
     *
     * @param id {number} - The ID number to find
     * @returns {IPromise<T>}
     */
    get(id: number): ng.IPromise<T> {
      const self = this;
      let deferred: ng.IDeferred<T> = self.$q.defer();

      self.$http.get(`/api/${self.moduleName}s/${id}`)
        .then(function(res) {
          self.activeEntry = (<IApiResponse>res.data).entries[0];
          deferred.resolve(self.activeEntry);
        }, function(err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    }

    /**
     * Save a new entry to the db.
     */
    save(data): ng.IPromise<T> {
      const self = this;
      let deferred: ng.IDeferred<T> = self.$q.defer();

      self.$http.post(`/api/${self.moduleName}s/create`, data)
        .then(function(res) {
          deferred.resolve((<IApiResponse>res.data).entries);
        }, function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };
  }
}
