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
                        ngModel: '='
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
                            });
                        })();
                    }
                };
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
