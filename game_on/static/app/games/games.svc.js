var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Games;
    (function (Games) {
        var GamesSvc = (function (_super) {
            __extends(GamesSvc, _super);
            function GamesSvc($http, $q) {
                _super.call(this, $http, $q, 'game');
                this.$http = $http;
                this.$q = $q;
            }
            return GamesSvc;
        })(App.Common.GenericService);
        Games.GamesSvc = GamesSvc;
        angular.module('games').service('gamesSvc', [
            '$http', '$q',
            GamesSvc]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
