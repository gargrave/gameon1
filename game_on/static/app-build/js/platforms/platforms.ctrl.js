var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../../../../typings/tsd.d.ts" />
var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        var PlatformsCtrl = (function (_super) {
            __extends(PlatformsCtrl, _super);
            function PlatformsCtrl($scope, $window, $stateParams, $state, dataSvc) {
                _super.call(this, $scope, $window, $stateParams, $state, dataSvc, 'platform');
            }
            PlatformsCtrl.prototype.defaultEntry = function () {
                return {
                    name: '',
                    color: ''
                };
            };
            PlatformsCtrl.prototype.buildSubmissionData = function () {
                this.submissionData = {
                    id: this.newEntry.id,
                    name: this.newEntry.name,
                    color: this.newEntry.color
                };
            };
            PlatformsCtrl.prototype.preValidate = function () {
                var self = this;
                var form = self.$scope.entryForm;
                form.$submitted = true;
                if (!form.$valid) {
                    self.error = 'Invalid submission. Please check the form for errors.';
                    return false;
                }
                var existing = _.find(self.entries, function (p) {
                    var plat = p;
                    return plat.name === self.newEntry.name;
                });
                if (existing) {
                    self.error = 'A platform with an identical name already exists.';
                }
                return existing === undefined;
            };
            PlatformsCtrl.prototype.canSaveEdits = function () {
                var canSave = true;
                this.error = '';
                if (this.newEntry.name === this.activeEntry.name &&
                    this.newEntry.color === this.activeEntry.color) {
                    this.error = 'No changes have been made.';
                    canSave = false;
                }
                return canSave;
            };
            return PlatformsCtrl;
        })(App.Common.GenericController);
        Platforms.PlatformsCtrl = PlatformsCtrl;
        angular.module('platforms').controller('PlatformsCtrl', [
            '$scope', '$window', '$stateParams', '$state', 'platformsSvc',
            PlatformsCtrl]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
