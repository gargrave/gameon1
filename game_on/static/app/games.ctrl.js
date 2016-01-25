var App;
(function (App) {
    var Games;
    (function (Games) {
        angular.module('gameon').controller('GamesCtrl', [
            function () {
                var vm = this;
                vm.message = 'This is the message from GamesCtrl.';
                console.log('GamesCtrl loaded!');
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
