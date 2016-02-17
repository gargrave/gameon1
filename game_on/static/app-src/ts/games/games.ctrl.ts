/// <reference path="../../../../../typings/tsd.d.ts" />
module App.Games {

  export class GamesCtrl extends App.Common.GenericController<IGame> {

    constructor($scope,
                $window: ng.IWindowService,
                $stateParams: ng.ui.IStateParamsService,
                $state: ng.ui.IStateService,
                dataSvc: App.Games.GamesSvc,
                protected platformsSvc: App.Platforms.PlatformsSvc) {
      super($scope, $window, $stateParams, $state, dataSvc, 'game');
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

    /*=============================================
     = API callbacks
     =============================================*/
    protected onApiFindSuccess(): void {
      const self = this;
      self.entries.forEach(function(entry, idx, array) {
        let start: Date = new Date(entry.startDate);
        let end: Date = new Date(entry.endDate);
        let diff: number = end.getTime() - start.getTime();
        entry.daysPlayed = 1 + (diff / (1000 * 60 * 60 * 24));
      });

      self.filterText = self.$stateParams['filter'] || '';
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

    protected canSaveEdits(): boolean {
      let canSave: boolean = true;
      this.error = '';

      if (this.newEntry.name === this.activeEntry.name &&
        this.newEntry.platform.id === this.activeEntry.platform.id &&
        this.newEntry.startDate === this.activeEntry.startDate &&
        this.newEntry.endDate === this.activeEntry.endDate &&
        this.newEntry.finished === this.activeEntry.finished) {
        this.error = 'No changes have been made.';
        canSave = false;
      }
      return canSave;
    }

    shouldShowResultsAlert(): boolean {
      return !this.working && this.filterText !== '';
    }
  }

  angular.module('games').controller('GamesCtrl', [
    '$scope', '$window', '$stateParams', '$state', 'gamesSvc',
    'platformsSvc',
    GamesCtrl]);
}
