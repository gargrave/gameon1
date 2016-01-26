var App;
(function (App) {
    var Games;
    (function (Games) {
        angular.module('gameon').controller('PlatformsCtrl', [
            'platformsSvc',
            function (platformsSvc) {
                var vm = this;
                vm.working = false;
                vm.platforms = [];
                vm.find = function () {
                    vm.working = true;
                    platformsSvc.query()
                        .then(function (res) {
                        vm.platforms = res.data;
                        vm.working = false;
                    });
                };
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
