var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        angular.module('platforms').directive('platformDropdown', [
            'platformsSvc',
            function (platformsSvc) {
                return {
                    restrict: 'AE',
                    scope: {},
                    templateUrl: 'static/views/platforms/platform-dropdown.html',
                    link: function ($scope) {
                        $scope.working = true;
                        $scope.platforms = [{
                                id: -1,
                                name: 'Loading...'
                            }];
                        $scope.selected = $scope.platforms[0];
                        (function () {
                            platformsSvc.query()
                                .then(function (res) {
                                $scope.platforms = res;
                                $scope.selected = $scope.platforms[0];
                                $scope.working = false;
                            });
                        })();
                    }
                };
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
