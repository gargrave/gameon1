/// <reference path="../../../typings/tsd.d.ts" />
module App.Games {
  angular.module('gameon').controller('GamesCtrl', [
    function() {
      const vm = this;
      vm.message = 'This is the message from GamesCtrl.';
      console.log('GamesCtrl loaded!');
    }
  ]);
}
