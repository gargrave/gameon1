var App;
(function (App) {
    var Games;
    (function (Games) {
        angular.module('gameon').controller('GamesCtrl', [
            'gamesSvc',
            function (gamesSvc) {
                var vm = this;
                vm.working = false;
                vm.games = [];
                vm.newGame = {};
                vm.error = '';
                vm.find = function () {
                    vm.error = '';
                    vm.working = true;
                    gamesSvc.query()
                        .then(function (res) {
                        vm.games = res;
                    }, function (err) {
                        vm.error = err.statusText;
                    })
                        .finally(function () {
                        vm.working = false;
                    });
                };
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
