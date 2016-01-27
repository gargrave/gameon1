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
      // the data for a new platform being created
      vm.newPlatform = {};
      // any error messages to display
      vm.error = '';

      /**
       * Queries the service for all current platforms
       */
      vm.find = function() {
        vm.error = '';
        vm.working = true;
        platformsSvc.query()
          .then(function(res) {
            vm.platforms = res.platforms;
          }, function(err) {
            vm.error = err;
          })
          .finally(function() {
            vm.working = false;
          });
      };

      /**
       * Sends the current 'new platform' data to the service to be saved
       */
      vm.create = function() {
        vm.error = '';
        vm.working = true;
        platformsSvc.save(vm.newPlatform)
          .then(function(res) {
            // add the new platform into the local list
            vm.platforms.push(res);
          }, function(err) {
            vm.error = err;
          })
          .finally(function() {
            vm.initCreateView();
            vm.working = false;
          });
      };

      vm.initCreateView = function() {
        vm.newPlatform = {
          name: ''
        };
      };
    }
  ]);
}
