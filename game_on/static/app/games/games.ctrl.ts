/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {
  angular.module('gameon').controller('GamesCtrl', [
    'gamesSvc',

    function(gamesSvc) {
      const vm = this;
      // whether we are currently working
      vm.working = false;
      // the list of platforms on the server
      vm.games = [];

      vm.find = function() {
        vm.working = true;
        gamesSvc.query()
          .then(function(res) {
            vm.games = res.data;
            vm.working = false;
          });
      };
    }
  ]);
}
