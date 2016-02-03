/// <reference path="../../../../typings/tsd.d.ts" />
module App.Games {

  import IPlatform = App.Platforms.IPlatform;
  import IScope = angular.IScope;

  /*=============================================
   = interface definitions
   =============================================*/
  export interface IGame extends App.Common.IDbEntry {
    name: string;
    platform: IPlatform;
    startDate: string;
    endDate: string;
    finished: boolean;
  }

  export interface IGameSubmission extends App.Common.IDbEntry {
    name: string;
    platform: number;
    startDate: string;
    endDate: string;
    finished: boolean;
  }

  export class GamesCtrl extends App.Common.GenericController<IGame> {

    constructor($window: ng.IWindowService,
                $stateParams: ng.ui.IStateParamsService,
                $state: ng.ui.IStateService,
                dataSvc: App.Games.GamesSvc,
                protected platformsSvc: App.Platforms.PlatformsSvc,
                protected $scope: ng.IScope) {
      super($window, $stateParams, $state, dataSvc, 'game');

      const self = this;
      $scope.$watch(() => {
          return self.newEntry.startDate;
        }, () => {
          self.onDateChanged();
        }
      );
      $scope.$watch(() => {
          return self.newEntry.endDate;
        }, () => {
          self.onDateChanged();
        }
      );
    }

    /*=============================================
     = initialization methods
     =============================================*/
    protected defaultEntry(): IGame {
      return {
        name: '',
        platform: {id: -1, name: ''},
        startDate: '',
        endDate: '',
        finished: false
      };
    }

    protected buildSubmissionData(): void {
      this.submissionData = {
        id: this.newEntry.id,
        name: this.newEntry.name,
        platform: this.newEntry.platform.id,
        startDate: this.newEntry.startDate,
        endDate: this.newEntry.endDate,
        finished: this.newEntry.finished
      };
    }

    onDateChanged(): void {
      const self = this;

      // if one date is blank, set it equal to the non-blank one
      if (self.newEntry.startDate && !self.newEntry.endDate) {
        self.newEntry.endDate = self.newEntry.startDate;
      } else if (self.newEntry.endDate && !self.newEntry.startDate) {
        self.newEntry.startDate = self.newEntry.endDate;
      } else {
        let start = new Date(self.newEntry.startDate);
        let end = new Date(self.newEntry.endDate);
        if (end < start) {
          self.newEntry.endDate = self.newEntry.startDate;
        }
      }
    }

    /*=============================================
     = validation methods
     =============================================*/
    protected preValidate(): boolean {
      const self = this;

      // make sure the platform value is valid
      let platform = self.submissionData.platform;
      if (typeof(platform) !== 'number' || platform < 0) {
        self.error = `Local Error: Invalid platform identifier: ${platform}`;
        return false;
      }

      // check for existing entries with this name and start-date
      let existing = _.find(self.entries, function(g) {
        let game: IGame = <IGame>g;
        return game.name === self.submissionData.name &&
          game.startDate === self.submissionData.startDate;
      });
      if (existing) {
        self.error = 'A game with an identical name and start-date already exists.';
        return false;
      }
      return true;
    }
  }

  angular.module('games').controller('GamesCtrl', [
    '$window', '$stateParams', '$state', 'gamesSvc',
    'platformsSvc', '$scope',
    GamesCtrl]);
}
