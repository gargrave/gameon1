/// <reference path="../../../../../../typings/tsd.d.ts" />
module App.Platforms {
  angular.module('platforms').directive('platformDropdown', [
    'platformsSvc',

    function(platformsSvc: App.Platforms.PlatformsSvc) {
      return {
        restrict: 'AE',
        scope: {
          selected: '='
        },
        templateUrl: 'static/views/platforms/partials/platform-dropdown.html',

        link: function($scope) {
          // set all values to default 'loading' states
          $scope.working = true;
          $scope.platforms = [{
            id: -1,
            name: 'Loading...'
          }];

          // initialization
          (function() {
            platformsSvc.query()
              .then(function(res) {
                $scope.platforms = res;
                $scope.working = false;
                // pre-select first option if a value is not already defined
                if ($scope.selected.name === '') {
                  $scope.selected = $scope.platforms[0];

                  // attempt to set 'PC (Win)' as the default platform
                  const DEFAULT_PLATFORM = 'PC (Win)';
                  $scope.platforms.forEach(function(p, idx) {
                    if (p.name === DEFAULT_PLATFORM) {
                      $scope.selected = $scope.platforms[idx];
                    }
                  });
                }
              });
          })();
        }
      };
    }
  ]);
}
