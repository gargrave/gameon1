/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {
  angular.module('gameon').controller('PlatformsCtrl', [
    'platformsSvc',

    function(platformsSvc) {
      const vm = this;
      // whether we are currently working
      vm.working = false;
      // the list of platforms on the server
      vm.platforms = [];

      vm.find = function() {
        vm.working = true;
        platformsSvc.query()
          .then(function(res) {
            vm.platforms = res.data;
            vm.working = false;
          });
      };
    }
  ]);
}
