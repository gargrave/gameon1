/// <reference path="../typings/tsd.d.ts" />
/// <reference path="../game_on/static/app-src/ts/app.d.ts" />
module App.Tests {

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
}
