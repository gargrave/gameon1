var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Games;
    (function (Games) {
        var GamesCtrl = (function (_super) {
            __extends(GamesCtrl, _super);
            function GamesCtrl($state, dataSvc) {
                _super.call(this, $state, dataSvc, 'game');
            }
            GamesCtrl.prototype.defaultEntry = function () {
                return {
                    name: '',
                    platform: -1,
                    startDate: '',
                    endDate: '',
                    finished: false
                };
            };
            GamesCtrl.prototype.preValidate = function () {
                var self = this;
                var platform = self.newEntry.platform;
                if (typeof (platform) !== 'number' || platform < 0) {
                    self.error = 'Invalid platform identifier.';
                    return false;
                }
                var existing = _.find(self.entries, function (g) {
                    var game = g;
                    return game.name === self.newEntry.name &&
                        game.startDate === self.newEntry.startDate;
                });
                if (existing) {
                    self.error = 'A game with an identical name and start-date already exists.';
                    return false;
                }
                return true;
            };
            return GamesCtrl;
        })(App.Common.GenericController);
        Games.GamesCtrl = GamesCtrl;
        angular.module('games').controller('GamesCtrl', [
            '$state', 'gamesSvc',
            GamesCtrl]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
