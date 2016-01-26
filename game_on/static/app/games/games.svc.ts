/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {
  angular.module('gameon').service('gamesSvc', [
    '$http', '$q',

    function($http, $q) {
      const vm = this;

      vm.query = function() {
        let deferred = $q.defer();
        $http.get('/api/games')
          .then(function(res) {
            deferred.resolve(res.data);
          });
        return deferred.promise;
      };
    }
  ]);
}
