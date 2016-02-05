var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../../../typings/tsd.d.ts" />
var App;
(function (App) {
    var Games;
    (function (Games) {
        var GamesCtrl = (function (_super) {
            __extends(GamesCtrl, _super);
            function GamesCtrl($window, $stateParams, $state, dataSvc, platformsSvc, $scope) {
                _super.call(this, $window, $stateParams, $state, dataSvc, 'game');
                this.platformsSvc = platformsSvc;
                this.$scope = $scope;
                var self = this;
                $scope.$watch(function () {
                    return self.newEntry.startDate;
                }, function () {
                    self.onDateChanged();
                });
                $scope.$watch(function () {
                    return self.newEntry.endDate;
                }, function () {
                    self.onDateChanged();
                });
            }
            GamesCtrl.prototype.defaultEntry = function () {
                return {
                    name: '',
                    platform: { id: -1, name: '' },
                    startDate: '',
                    endDate: '',
                    finished: false
                };
            };
            GamesCtrl.prototype.buildSubmissionData = function () {
                this.submissionData = {
                    id: this.newEntry.id,
                    name: this.newEntry.name,
                    platform: this.newEntry.platform.id,
                    startDate: this.newEntry.startDate,
                    endDate: this.newEntry.endDate,
                    finished: this.newEntry.finished
                };
            };
            GamesCtrl.prototype.onDateChanged = function () {
                var self = this;
                if (self.newEntry.startDate && !self.newEntry.endDate) {
                    self.newEntry.endDate = self.newEntry.startDate;
                }
                else if (self.newEntry.endDate && !self.newEntry.startDate) {
                    self.newEntry.startDate = self.newEntry.endDate;
                }
                else {
                    var start = new Date(self.newEntry.startDate);
                    var end = new Date(self.newEntry.endDate);
                    if (end < start) {
                        self.newEntry.endDate = self.newEntry.startDate;
                    }
                }
            };
            GamesCtrl.prototype.preValidate = function () {
                var self = this;
                var platform = self.submissionData.platform;
                if (typeof (platform) !== 'number' || platform < 0) {
                    self.error = "Local Error: Invalid platform identifier: " + platform;
                    return false;
                }
                var existing = _.find(self.entries, function (g) {
                    var game = g;
                    return game.name === self.submissionData.name &&
                        game.startDate === self.submissionData.startDate;
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
            '$window', '$stateParams', '$state', 'gamesSvc',
            'platformsSvc', '$scope',
            GamesCtrl]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
