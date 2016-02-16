var App;
(function (App) {
    var Common;
    (function (Common) {
        var MS_PER_DAY = 1000 * 60 * 60 * 24;
        function DaysFilter() {
            return function (input, endDate) {
                var start = new Date(input);
                var end = new Date(endDate);
                var daysString = '1 day';
                if (start < end) {
                    var diff = end.getTime() - start.getTime();
                    var days = 1 + (diff / MS_PER_DAY);
                    daysString = days + " days";
                }
                return daysString;
            };
        }
        Common.DaysFilter = DaysFilter;
        angular.module('common').filter('daysFilter', DaysFilter);
        function TruncFilter() {
            return function (input, len) {
                var str = input;
                if (str.length > len) {
                    str = input.substring(0, len) + '...';
                }
                return str;
            };
        }
        Common.TruncFilter = TruncFilter;
        angular.module('common').filter('truncFilter', TruncFilter);
    })(Common = App.Common || (App.Common = {}));
})(App || (App = {}));
