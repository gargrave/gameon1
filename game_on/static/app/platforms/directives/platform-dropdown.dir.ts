module App.Platforms {
  angular.module('platforms').directive('platformDropdown', [
    'platformsSvc',

    function(platformsSvc: App.Platforms.PlatformsSvc) {
      return {
        restrict: 'AE',
        scope: {},
        templateUrl: 'static/views/platforms/platform-dropdown.html',

        link: function($scope) {
          // set all values to default 'loading' states
          $scope.working = true;
          $scope.platforms = [{
            id: -1,
            name: 'Loading...'
          }];
          $scope.selected = $scope.platforms[0];

          // initialization
          (function() {
            platformsSvc.query()
              .then(function(res) {
                $scope.platforms = res;
                $scope.selected = $scope.platforms[0];
                $scope.working = false;
              });
          })();
        }
      };
    }
  ]);
}
