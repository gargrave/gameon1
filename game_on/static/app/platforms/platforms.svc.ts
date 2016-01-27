/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {
  angular.module('gameon').service('platformsSvc', [
    '$http', '$q',

    function($http, $q) {
      const vm = this;

      vm.query = function() {
        let deferred = $q.defer();
        $http.get('/api/platforms')
          .then(function(res) {
            deferred.resolve(res.data);
          }, function(err) {
            deferred.reject(err.data);
          });
        return deferred.promise;
      };

      vm.save = function(data) {
        let deferred = $q.defer();
        $http.post('/api/platforms/add', data)
          .then(function(res) {
            deferred.resolve(res.data);
          }, function(err) {
            deferred.reject(err.data);
          });
        return deferred.promise;
      };
    }
  ]);
}
