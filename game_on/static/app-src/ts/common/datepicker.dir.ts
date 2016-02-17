/// <reference path="../../../../../typings/tsd.d.ts" />
module App.Platforms {
  // a counter to give unique names to each instance
  let counter = 0;

  angular.module('gameon').directive('datepicker', [

    function() {
      return {
        restrict: 'AE',
        scope: {
          label: '@',
          name: '@',
          dateModel: '='
        },

        template: `
        <label for="{A ::uniqueId A}"><span ng-bind="label"></span></label>
        <div id="{A ::uniqueId A}">
          <input type="text" class="form-control" name="{A ::name A}"
                 maxlength="10" ng-pattern="/^20[0-1][0-9]-[0-1][0-9]-[0-3][0-9]$/"
                 placeholder="Click to select date"
                 ng-model="dateModel" required>
        </div>
        `,

        link: function($scope, elem) {
          let dateInitialized = false;
          // set a unique id for each instance
          $scope.uniqueId = 'datepicker_' + counter++;

          // set up datepicker options
          elem.find('input').datepicker({
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayHighlight: true
          });

          // watch the date model a single time for a change
          // this will allow us to set the datepicker's internal 'date' variable
          // when the date has already been set (e.g. when using the 'update game' form)
          $scope.$watch('dateModel', function() {
            if ($scope.dateModel && !dateInitialized) {
              dateInitialized = true;
              elem.find('input').datepicker('setUTCDate', new Date($scope.dateModel));
            }
          });
        }
      };
    }
  ]);
}
