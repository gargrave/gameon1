/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {

  /*=============================================
   = interface definitions
   =============================================*/
  export interface IGame {
    name: string;
    platform: string;
    startDate: string;
    endDate: string;
    finished: boolean;
  }

  export class GamesCtrl extends App.Common.GenericController<IGame> {
    constructor($state,
                dataSvc: App.Games.GamesSvc) {
      super($state, dataSvc, 'game');
    }

    protected defaultEntry(): IGame {
      return {
        name: '',
        platform: '',
        startDate: '',
        endDate: '',
        finished: false
      };
    }

    protected preValidate(): boolean {
      const self = this;

      // check for existing entries with this name
      let existing = _.find(self.entries, function(g) {
        let game: IGame = <IGame>g;
        return game.name === self.newEntry.name &&
          game.startDate === self.newEntry.startDate;
      });
      if (existing) {
        self.error = 'A game with an identical name and start-date already exists.';
      }
      return existing === undefined;
    }
  }

  angular.module('games').controller('GamesCtrl', [
    '$state', 'gamesSvc',
    GamesCtrl]);
}
