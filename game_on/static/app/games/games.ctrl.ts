/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {

  /*=============================================
   = interface definitions
   =============================================*/
  export interface IGame extends App.Common.IDbEntry {
    name: string;
    platform: number;
    startDate: string;
    endDate: string;
    finished: boolean;
  }

  export class GamesCtrl extends App.Common.GenericController<IGame> {
    constructor($stateParams: ng.ui.IStateParamsService,
                $state: ng.ui.IStateService,
                dataSvc: App.Games.GamesSvc) {
      super($stateParams, $state, dataSvc, 'game');
    }

    protected defaultEntry(): IGame {
      return {
        name: '',
        platform: -1,
        startDate: '',
        endDate: '',
        finished: false
      };
    }

    protected preValidate(): boolean {
      const self = this;

      // make sure the platform value is valid
      let platform = self.newEntry.platform;
      if (typeof(platform) !== 'number' || platform < 0) {
        self.error = 'Invalid platform identifier.';
        return false;
      }

      // check for existing entries with this name and start-date
      let existing = _.find(self.entries, function(g) {
        let game: IGame = <IGame>g;
        return game.name === self.newEntry.name &&
          game.startDate === self.newEntry.startDate;
      });
      if (existing) {
        self.error = 'A game with an identical name and start-date already exists.';
        return false;
      }
      return true;
    }
  }

  angular.module('games').controller('GamesCtrl', [
    '$stateParams', '$state', 'gamesSvc',
    GamesCtrl]);
}
