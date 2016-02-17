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
            function GamesCtrl($scope, $window, $stateParams, $state, dataSvc, platformsSvc) {
                _super.call(this, $scope, $window, $stateParams, $state, dataSvc, 'game');
                this.platformsSvc = platformsSvc;
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
            GamesCtrl.prototype.onApiFindSuccess = function () {
                var self = this;
                self.entries.forEach(function (entry, idx, array) {
                    var start = new Date(entry.startDate);
                    var end = new Date(entry.endDate);
                    var diff = end.getTime() - start.getTime();
                    entry.daysPlayed = 1 + (diff / (1000 * 60 * 60 * 24));
                });
            };
            GamesCtrl.prototype.preValidate = function () {
                var self = this;
                var form = self.$scope.entryForm;
                form.$submitted = true;
                if (!form.$valid) {
                    self.error = 'Invalid submission. Please check the form for errors.';
                    return false;
                }
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
            GamesCtrl.prototype.canSaveEdits = function () {
                var canSave = true;
                this.error = '';
                if (this.newEntry.name === this.activeEntry.name &&
                    this.newEntry.platform.id === this.activeEntry.platform.id &&
                    this.newEntry.startDate === this.activeEntry.startDate &&
                    this.newEntry.endDate === this.activeEntry.endDate &&
                    this.newEntry.finished === this.activeEntry.finished) {
                    this.error = 'No changes have been made.';
                    canSave = false;
                }
                return canSave;
            };
            GamesCtrl.prototype.shouldShowResultsAlert = function () {
                return !this.working && this.filterText !== '';
            };
            return GamesCtrl;
        })(App.Common.GenericController);
        Games.GamesCtrl = GamesCtrl;
        angular.module('games').controller('GamesCtrl', [
            '$scope', '$window', '$stateParams', '$state', 'gamesSvc',
            'platformsSvc',
            GamesCtrl]);
    })(Games = App.Games || (App.Games = {}));
})(App || (App = {}));
