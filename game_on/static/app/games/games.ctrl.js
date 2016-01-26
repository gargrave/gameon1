var App;
(function (App) {
    var Games;
    (function (Games) {
        angular.module('gameon').controller('GamesCtrl', [
            function () {
                var vm = this;
            }
        ]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
