/// <reference path="../../../../../typings/tsd.d.ts" />
module App.Platforms {

  export class PlatformsCtrl extends App.Common.GenericController<IPlatform> {
    constructor($scope,
                $window: ng.IWindowService,
                $stateParams: ng.ui.IStateParamsService,
                $state: ng.ui.IStateService,
                dataSvc: App.Platforms.PlatformsSvc) {
      super($scope, $window, $stateParams, $state, dataSvc, 'platform');
    }

    /*=============================================
     = initialization methods
     =============================================*/
    protected defaultEntry(): IPlatform {
      return {
        name: ''
      };
    }

    protected buildSubmissionData(): void {
      this.submissionData = {
        id: this.newEntry.id,
        name: this.newEntry.name
      };
    }

    /*=============================================
     = validation methods
     =============================================*/
    protected preValidate(): boolean {
      // TODO make a wrapper interface for forms
      const self = this;

      self.$scope.entryForm.$submitted = true;
      if (!this.$scope.entryForm.$valid) {
        self.error = 'There were problems with the data submitted.';
        return false;
      }

      // check for existing entries with this name
      let existing = _.find(self.entries, function(p) {
        let plat: IPlatform = <IPlatform>p;
        return plat.name === self.newEntry.name;
      });
      if (existing) {
        self.error = 'A platform with an identical name already exists.';
      }
      return existing === undefined;
    }
  }

  angular.module('platforms').controller('PlatformsCtrl', [
    '$scope', '$window', '$stateParams', '$state', 'platformsSvc',
    PlatformsCtrl]);
}
