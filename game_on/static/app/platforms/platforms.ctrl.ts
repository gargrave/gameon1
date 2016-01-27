/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {

  import IPlatform = App.Platforms.IPlatform;

  angular.module('platforms').controller('PlatformsCtrl', [
    '$state', 'platformsSvc',

    function($state, platformsSvc) {
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
            vm.platforms = res;
          }, function(err) {
            vm.error = err.statusText;
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
        if (preValidate()) {
          vm.working = true;
          platformsSvc.save(vm.newPlatform)
            .then(function(res) {
              // add the new platform into the local list
              vm.platforms.push(res);
              vm.initCreateView();
              $state.go('platforms-list');
            }, function(err) {
              vm.error = err.statusText;
            })
            .finally(function() {
              vm.working = false;
            });
        }
      };

      /**
       * Resets the 'new platform' data to default/empty state
       */
      vm.initCreateView = function() {
        // make sure the platforms list has been filled
        if (vm.platforms.length === 0) {
          vm.find();
        }
        vm.newPlatform = {
          name: ''
        };
      };

      function preValidate() {
        // check for existing platforms with this name
        let existing = _.find(vm.platforms, function(p) {
          let plat: IPlatform = <IPlatform>p;
          return plat.name === vm.newPlatform.name;
        });
        if (existing) {
          vm.error = 'A platform with an identical name already exists.';
        }
        return existing === undefined;
      }
    }
  ]);
}
