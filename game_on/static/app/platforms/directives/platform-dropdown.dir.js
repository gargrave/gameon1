var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        angular.module('platforms').directive('platformDropdown', [
            'platformsSvc',
            function (platformsSvc) {
                return {
                    restrict: 'AE',
                    scope: {
                        selected: '='
                    },
                    templateUrl: 'static/views/platforms/partials/platform-dropdown.html',
                    link: function ($scope) {
                        $scope.working = true;
                        $scope.platforms = [{
                                id: -1,
                                name: 'Loading...'
                            }];
                        (function () {
                            platformsSvc.query()
                                .then(function (res) {
                                $scope.platforms = res;
                                $scope.working = false;
                                if ($scope.selected.name === '') {
                                    $scope.selected = $scope.platforms[0];
                                }
                            });
                        })();
                    }
                };
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
