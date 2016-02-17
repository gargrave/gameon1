/// <reference path="../../../../../typings/tsd.d.ts" />
var App;
(function (App) {
    var Platforms;
    (function (Platforms) {
        var counter = 0;
        angular.module('gameon').directive('datepicker', [
            function () {
                return {
                    restrict: 'AE',
                    scope: {
                        label: '@',
                        name: '@',
                        dateModel: '='
                    },
                    template: "\n        <label for=\"{A ::uniqueId A}\"><span ng-bind=\"label\"></span></label>\n        <div id=\"{A ::uniqueId A}\">\n          <input type=\"text\" class=\"form-control\" name=\"{A ::name A}\"\n                 maxlength=\"10\" ng-pattern=\"/^20[0-1][0-9]-[0-1][0-9]-[0-3][0-9]$/\"\n                 placeholder=\"Click to select date\"\n                 ng-model=\"dateModel\" required>\n        </div>\n        ",
                    link: function ($scope, elem) {
                        var dateInitialized = false;
                        $scope.uniqueId = 'datepicker_' + counter++;
                        elem.find('input').datepicker({
                            format: 'yyyy-mm-dd',
                            autoclose: true,
                            todayHighlight: true
                        });
                        $scope.$watch('dateModel', function () {
                            if ($scope.dateModel && !dateInitialized) {
                                dateInitialized = true;
                                elem.find('input').datepicker('setUTCDate', new Date($scope.dateModel));
                            }
                        });
                    }
                };
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
