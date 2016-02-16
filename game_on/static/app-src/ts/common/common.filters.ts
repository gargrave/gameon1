module App.Common {

  const MS_PER_DAY: number = 1000 * 60 * 60 * 24;

  /*
   * Turns a set of dates into an 'xx days' string. Minimum is 1 day.
   *
   * e.g.
   *  '2016-01-01' | days:'2015-01-01' -> 1 day (i.e. because it is an invalid format)
   *  '2016-01-01' | days:'2016-01-02' -> 2 days
   *
   * The dates will always be 1 larger than they seem, so that if the start and end
   * date are the same day, it will be '1 day'.
   */
  export function DaysFilter() {
    return function(input: string, endDate: string): string {
      let start: Date = new Date(input);
      let end: Date = new Date(endDate);
      let daysString: string = '1 day';

      if (start < end) {
        let diff: number = end.getTime() - start.getTime();
        let days: number = 1 + (diff / MS_PER_DAY);
        daysString = `${days} days`;
      }
      return daysString;
    };
  }
  angular.module('common').filter('daysFilter', DaysFilter);

  /*
   * Truncates the provided string to the specified length. If the string is shorter
   * or equal to the specified length, no change occurs.
   */
  export function TruncFilter() {
    return function(input: string, len: number): string {
      let str = input;
      if (str.length > len) {
        // truncate the string
        str = input.substring(0, len) + '...';
      }
      return str;
    };
  }
  angular.module('common').filter('truncFilter', TruncFilter);

  /*
   * Adds the appropriate ending to pluralize a word based on the count
   *
   * e.g.
   *  'day' | pluralize: 1 -> 'day'
   *  'day' | pluralize: 2 -> 'days'
   */
  export function PluralizeFilter() {
    return function(input: string, count: number): string {
      let str = input;
      if (count !== 1) {
        str += 's';
      }
      return str;
    };
  }
  angular.module('common').filter('pluralize', PluralizeFilter);

  /*
   * Translates true/false values into Yes/No strings.
   */
  export function BooleanFilter() {
    return function(input: string) {
      return input.toLowerCase() === 'true' ? 'Yes' : 'No';
    };
  }
  angular.module('common').filter('boolean', BooleanFilter);
}
