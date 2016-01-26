/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {
  angular.module('gameon').service('platformsSvc', [
    '$http', '$q',

    function($http, $q) {
      const vm = this;

      vm.query = function() {
        let fakeres = {
          data: [
            {name: 'Xbox One'},
            {name: 'PS3'}
          ]
        };
        let deferred = $q.defer();
        //$http.get('/api/platforms')
        //  .then(function(res) {
        //    deferred.resolve(fakeres);
        //  });
        deferred.resolve(fakeres);
        return deferred.promise;
      };
    }]);
}
