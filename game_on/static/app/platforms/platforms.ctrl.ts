/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {

  /*=============================================
   = interface definitions
   =============================================*/
  export interface IPlatform extends App.Common.IDbEntry {
    name: string;
  }

  export class PlatformsCtrl extends App.Common.GenericController<IPlatform> {
    constructor($window: ng.IWindowService,
                $stateParams: ng.ui.IStateParamsService,
                $state: ng.ui.IStateService,
                dataSvc: App.Platforms.PlatformsSvc) {
      super($window, $stateParams, $state, dataSvc, 'platform');
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
    '$window', '$stateParams', '$state', 'platformsSvc',
    PlatformsCtrl]);
}
