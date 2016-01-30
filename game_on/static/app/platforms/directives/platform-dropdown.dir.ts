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
              });
          })();
        }
      };
    }
  ]);
}
