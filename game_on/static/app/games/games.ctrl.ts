/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {
  angular.module('gameon').controller('GamesCtrl', [
    'gamesSvc',

    function(gamesSvc) {
      const vm = this;
      // whether we are currently working
      vm.working = false;
      // the list of entries on the server
      vm.games = [];
      // the data for a new platform being created
      vm.newGame = {};
      // any error messages to display
      vm.error = '';

      /**
       * Queries the service for all current games
       */
      vm.find = function() {
        vm.error = '';
        vm.working = true;
        gamesSvc.query()
          .then(function(res) {
            vm.games = res;
          }, function(err) {
            vm.error = err.statusText;
          })
          .finally(function() {
            vm.working = false;
          });
      };
    }
  ]);
}
