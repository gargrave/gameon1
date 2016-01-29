/// <reference path="../../../../typings/tsd.d.ts" />
module App.Platforms {

  /*=============================================
   = interface definitions
   =============================================*/
  export interface IPlatform {
    id?: number;
    name: string;
    created?: string;
    modified?: string;
  }

  export class PlatformsCtrl extends App.Common.GenericController<IPlatform> {
    constructor($state,
                dataSvc: App.Platforms.PlatformsSvc) {
      super($state, dataSvc, 'platform');
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
    '$state', 'platformsSvc',
    PlatformsCtrl]);
}
