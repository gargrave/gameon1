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
        var PlatformsSvc = (function (_super) {
            __extends(PlatformsSvc, _super);
            function PlatformsSvc($http, $q) {
                _super.call(this, $http, $q, 'platform');
                this.$http = $http;
                this.$q = $q;
            }
            return PlatformsSvc;
        })(App.Common.GenericService);
        Platforms.PlatformsSvc = PlatformsSvc;
        angular.module('platforms').service('platformsSvc', [
            '$http', '$q',
            PlatformsSvc]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
