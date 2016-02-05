/// <reference path="../../../../../typings/tsd.d.ts" />
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
    remove(id: number): ng.IPromise<T>;
  }

  /*=============================================
   = class implementation
   =============================================*/
  export abstract class GenericService<T> implements IGenericService<T> {

    protected entries: T[];
    protected needsUpdate: boolean = false;

    constructor(protected $http: ng.IHttpService,
                protected $q: ng.IQService,
                protected moduleName: string) {
    }

    /**
     * Query the db and returns an Array of all entries.
     */
    query(): ng.IPromise<T[]> {
      const self = this;
      const url = `/api/${self.moduleName}s`;
      let deferred: ng.IDeferred<T[]> = self.$q.defer();

      if (self.entries && !self.needsUpdate) {
        deferred.resolve(self.entries);
      } else {
        self.$http.get(url)
          .then(function(res) {
            self.entries = (<IApiResponse>res.data).entries;
            self.needsUpdate = false;
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
      const url = `/api/${self.moduleName}s/${id}`;
      let deferred: ng.IDeferred<T> = self.$q.defer();

      self.$http.get(url)
        .then(function(res) {
          deferred.resolve((<IApiResponse>res.data).entries[0]);
        }, function(err) {
          deferred.reject(err.data);
        });
      return deferred.promise;
    }

    /**
     * Saves a new entry to the db.
     */
    save(data: T): ng.IPromise<T> {
      const self = this;
      const url = `/api/${self.moduleName}s/create`;
      let deferred: ng.IDeferred<T> = self.$q.defer();

      self.$http.post(url, data)
        .then(function(res) {
          self.needsUpdate = true;
          deferred.resolve((<IApiResponse>res.data).entries[0]);
        }, function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    /**
     * Updates an existing entry on the db.
     */
    update(data: T): ng.IPromise<T> {
      const self = this;
      const url = `/api/${self.moduleName}s/update`;
      let deferred: ng.IDeferred<T> = self.$q.defer();

      self.$http.post(url, data)
        .then(function(res) {
          self.needsUpdate = true;
          deferred.resolve((<IApiResponse>res.data).entries[0]);
        }, function(err) {
          deferred.reject(err);
        });
      return deferred.promise;
    };

    /**
     * Removes the entry with the matching id from the db.
     */
    remove(id: number): ng.IPromise<T> {
      const self = this;
      const url = `/api/${self.moduleName}s/delete`;
      let deferred: ng.IDeferred<T> = self.$q.defer();

      self.$http.post(url, {id: id})
        .then(function(res) {
          self.needsUpdate = true;
          deferred.resolve(null);
        });
      return deferred.promise;
    }
  }
}
