/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {

  /*=============================================
   = interface definitions
   =============================================*/
  export interface IPlatform extends App.Common.IDbEntry {
    name: string;
  }

  export class PlatformsCtrl extends App.Common.GenericController<IPlatform> {
    constructor($stateParams: ng.ui.IStateParamsService,
                $state: ng.ui.IStateService,
                dataSvc: App.Platforms.PlatformsSvc) {
      super($stateParams, $state, dataSvc, 'platform');
    }

    protected defaultEntry(): IPlatform {
      return {
        name: ''
      };
    }

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
    '$stateParams', '$state', 'platformsSvc',
    PlatformsCtrl]);
}
