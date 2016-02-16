declare module App.Games {

  export interface IGame extends App.Common.IDbEntry {
    name: string;
    platform: App.Platforms.IPlatform;
    startDate: string;
    endDate: string;
    finished: boolean;
    daysPlayed?: number;
  }

  export interface IGameSubmission extends App.Common.IDbEntry {
    name: string;
    platform: number;
    startDate: string;
    endDate: string;
    finished: boolean;
  }
}
