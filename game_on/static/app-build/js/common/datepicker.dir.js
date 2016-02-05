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
                        dateModel: '='
                    },
                    template: "\n        <label for=\"{A ::uniqueId A}\"><span ng-bind=\"label\"></span></label>\n        <div id=\"{A ::uniqueId A}\">\n          <input type=\"text\" class=\"form-control\" maxlength=\"10\"\n                 ng-model=\"dateModel\" required>\n        </div>\n        ",
                    link: function ($scope, elem) {
                        $scope.uniqueId = 'datepicker_' + counter++;
                        elem.find('input').datepicker({
                            format: 'yyyy-mm-dd',
                            autoclose: true,
                            todayHighlight: true
                        });
                    }
                };
            }
        ]);
    })(Platforms = App.Platforms || (App.Platforms = {}));
})(App || (App = {}));
