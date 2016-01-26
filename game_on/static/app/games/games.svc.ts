/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {
  angular.module('gameon').service('gamesSvc', [
    '$http', '$q',

    function($http, $q) {
      const vm = this;

      vm.query = function() {
        let fakeres = {
          data: [
            {
              name: 'Lords of the Fallen',
              platform: 'Xbox One',
              start_date: '2014-10-31',
              end_date: '2014-11-15',
              finished: true
            },
            {
              name: 'Kingdom Hearts 1.5 HD',
              platform: 'PS3',
              start_date: '2014-7-22',
              end_date: '2014-2-31',
              finished: true
            }
          ]
        };
        let deferred = $q.defer();
        //$http.get('/api/games')
        //  .then(function(res) {
        //    deferred.resolve(fakeres);
        //  });
        deferred.resolve(fakeres);
        return deferred.promise;
      };
    }
  ]);
}
