/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../game_on/static/app-src/ts/app.d.ts" />
var App;
(function (App) {
    var Tests;
    (function (Tests) {
        describe('daysFilter', function () {
            var defaultString = '1 day';
            var filter;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function (_$filter_) {
                filter = _$filter_('daysFilter');
            }));
            it('should return "1 day" if the dates are the same', function () {
                var start = '2016-01-01';
                var end = '2016-01-01';
                var result = filter(start, end);
                expect(result).toBe(defaultString);
            });
            it('should return "1 day" if the end day is before the start date', function () {
                var start = '2016-01-01';
                var end = '2015-01-01';
                var result = filter(start, end);
                expect(result).toBe(defaultString);
            });
            it('should return "2 days" if the end day is the day after the start day', function () {
                var start = '2016-01-01';
                var end = '2016-01-02';
                var result = filter(start, end);
                expect(result).toBe('2 days');
            });
            it('should return "32 days" if the end day is one month after the start day', function () {
                var start = '2016-01-01';
                var end = '2016-02-01';
                var result = filter(start, end);
                expect(result).toBe('32 days');
            });
        });
    })(Tests = App.Tests || (App.Tests = {}));
})(App || (App = {}));
