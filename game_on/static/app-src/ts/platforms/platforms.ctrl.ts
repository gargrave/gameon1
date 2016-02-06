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
      const self = this;
      const form: App.Common.IFormWrapper = self.$scope.entryForm;

      // set the form's 'submitted' status and check if it is valid
      form.$submitted = true;
      if (!form.$valid) {
        self.error = 'Invalid submission. Please check the form for errors.';
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
