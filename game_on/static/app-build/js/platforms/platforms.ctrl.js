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
                    name: ''
                };
            };
            PlatformsCtrl.prototype.buildSubmissionData = function () {
                this.submissionData = {
                    id: this.newEntry.id,
                    name: this.newEntry.name
                };
            };
            PlatformsCtrl.prototype.preValidate = function () {
                this.$scope.entryForm.$submitted = true;
                if (this.$scope.entryForm.$valid) {
                    var self_1 = this;
                    var existing = _.find(self_1.entries, function (p) {
                        var plat = p;
                        return plat.name === self_1.newEntry.name;
                    });
                    if (existing) {
                        self_1.error = 'A platform with an identical name already exists.';
                    }
                    return existing === undefined;
                }
            };
            return PlatformsCtrl;
        })(App.Common.GenericController);
        Platforms.PlatformsCtrl = PlatformsCtrl;
        angular.module('platforms').controller('PlatformsCtrl', [
            '$scope', '$window', '$stateParams', '$state', 'platformsSvc',
            PlatformsCtrl]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
