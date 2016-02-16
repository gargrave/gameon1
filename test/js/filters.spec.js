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
        describe('truncFilter', function () {
            var filter;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function (_$filter_) {
                filter = _$filter_('truncFilter');
            }));
            it('should get the same string back if it is shorter than the specified length', function () {
                var testStr = 'This is the test str.';
                var result = filter(testStr, 21);
                expect(result).toEqual(testStr);
            });
            it('should return a truncated string if it is longer than the specified length', function () {
                var testStr = 'This is the test str.';
                var result = filter(testStr, 18);
                var expected = 'This is the test s...';
                expect(result).toEqual(expected);
            });
        });
        describe('truncFilter', function () {
            var filter;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function (_$filter_) {
                filter = _$filter_('pluralize');
            }));
            it('should not change the word for single objects', function () {
                var result = filter('day', 1);
                expect(result).toBe('day');
            });
            it('should add an "s" for plural objects', function () {
                var result = filter('day', 2);
                expect(result).toBe('days');
            });
        });
        describe('truncFilter', function () {
            var filter;
            beforeEach(angular.mock.module('gameon'));
            beforeEach(inject(function (_$filter_) {
                filter = _$filter_('boolean');
            }));
            it('should return "Yes" for "true" values', function () {
                expect(filter('True')).toBe('Yes');
                expect(filter('true')).toBe('Yes');
                expect(filter(true)).toBe('Yes');
            });
            it('should return "No" for "false" values', function () {
                expect(filter('False')).toBe('No');
                expect(filter('false')).toBe('No');
                expect(filter(false)).toBe('No');
            });
        });
    })(Tests = App.Tests || (App.Tests = {}));
})(App || (App = {}));
