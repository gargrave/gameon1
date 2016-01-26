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
                vm.find = function () {
                    vm.working = true;
                    gamesSvc.query()
                        .then(function (res) {
                        vm.games = res.data;
                        vm.working = false;
                    });
                };
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
