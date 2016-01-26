(function() {
  'use strict';
  angular.module('gameon').service('gamesSvc', [
    '$http', '$q',

    function($http, $q) {
      const vm = this;

      vm.query = function() {
        let res = {
          data: [
            {name: 'Xbox One'},
            {name: 'PS3'}
          ]
        };
        let deferred = $q.defer();
        deferred.resolve(res);
        return deferred.promise;
      };
    }]);
})();
