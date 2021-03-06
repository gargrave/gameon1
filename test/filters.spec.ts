/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../game_on/static/app-src/ts/app.d.ts" />
module App.Tests {

  /*==============================================
   = Days Filter
   ==============================================*/
  describe('daysFilter', function() {

    let defaultString: string = '1 day';
    let filter;

    beforeEach(angular.mock.module('gameon'));
    beforeEach(inject(function(_$filter_) {
      filter = _$filter_('daysFilter');
    }));

    it('should return "1 day" if the dates are the same', function() {
      let start = '2016-01-01';
      let end = '2016-01-01';
      let result = filter(start, end);

      expect(result).toBe(defaultString);
    });

    it('should return "1 day" if the end day is before the start date', function() {
      let start = '2016-01-01';
      let end = '2015-01-01';
      let result = filter(start, end);

      expect(result).toBe(defaultString);
    });

    it('should return "2 days" if the end day is the day after the start day', function() {
      let start = '2016-01-01';
      let end = '2016-01-02';
      let result = filter(start, end);

      expect(result).toBe('2 days');
    });

    it('should return "32 days" if the end day is one month after the start day', function() {
      let start = '2016-01-01';
      let end = '2016-02-01';
      let result = filter(start, end);

      expect(result).toBe('32 days');
    });
  });

  /*==============================================
   = Truncate Filter
   ==============================================*/
  describe('TruncFilter', function() {
    let filter;

    beforeEach(angular.mock.module('gameon'));
    beforeEach(inject(function(_$filter_) {
      filter = _$filter_('truncFilter');
    }));

    it('should get the same string back if it is shorter than the specified length', function() {
      let testStr = 'This is the test str.';
      let result = filter(testStr, 21);

      expect(result).toEqual(testStr);
    });

    it('should return a truncated string if it is longer than the specified length', function() {
      let testStr = 'This is the test str.';
      let result = filter(testStr, 18);
      let expected = 'This is the test s...';

      expect(result).toEqual(expected);
    });
  });

  /*==============================================
   = Pluralize Filter
   ==============================================*/
  describe('PluralizeFilter', function() {
    let filter;

    beforeEach(angular.mock.module('gameon'));
    beforeEach(inject(function(_$filter_) {
      filter = _$filter_('pluralize');
    }));

    it('should not change the word for single objects', function() {
      let result = filter('day', 1);
      expect(result).toBe('day');
    });

    it('should add an "s" for plural objects', function() {
      let result = filter('day', 2);
      expect(result).toBe('days');
    });
  });

  /*==============================================
   = Boolean Filter
   ==============================================*/
  describe('BooleanFilter', function() {
    let filter;

    beforeEach(angular.mock.module('gameon'));
    beforeEach(inject(function(_$filter_) {
      filter = _$filter_('boolean');
    }));

    it('should return "Yes" for "true" values', function() {
      expect(filter('True')).toBe('Yes');
      expect(filter('true')).toBe('Yes');
      expect(filter(true)).toBe('Yes');
    });

    it('should return "No" for "false" values', function() {
      expect(filter('False')).toBe('No');
      expect(filter('false')).toBe('No');
      expect(filter(false)).toBe('No');
    });
  });
}
