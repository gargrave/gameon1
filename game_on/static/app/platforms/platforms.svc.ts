/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {
  angular.module('gameon').service('platformsSvc', [
    '$http', '$q',

    function($http, $q) {
      const vm = this;
      let platforms;

      vm.query = function() {
        let deferred = $q.defer();
        if (platforms) {
          deferred.resolve(platforms);
        } else {
          $http.get('/api/platforms')
            .then(function(res) {
              platforms = res.data.platforms;
              deferred.resolve(platforms);
            }, function(err) {
              deferred.reject(err.data);
            });
        }
        return deferred.promise;
      };

      vm.save = function(data) {
        let deferred = $q.defer();
        $http.post('/api/platforms/add', data)
          .then(function(res) {
            deferred.resolve(res.data.platform[0]);
          }, function(err) {
            deferred.reject(err);
          });
        return deferred.promise;
      };
    }
  ]);
}
