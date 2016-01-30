var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        var PlatformsCtrl = (function (_super) {
            __extends(PlatformsCtrl, _super);
            function PlatformsCtrl($window, $stateParams, $state, dataSvc) {
                _super.call(this, $window, $stateParams, $state, dataSvc, 'platform');
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
                var self = this;
                var existing = _.find(self.entries, function (p) {
                    var plat = p;
                    return plat.name === self.newEntry.name;
                });
                if (existing) {
                    self.error = 'A platform with an identical name already exists.';
                }
                return existing === undefined;
            };
            return PlatformsCtrl;
        })(App.Common.GenericController);
        Platforms.PlatformsCtrl = PlatformsCtrl;
        angular.module('platforms').controller('PlatformsCtrl', [
            '$window', '$stateParams', '$state', 'platformsSvc',
            PlatformsCtrl]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
