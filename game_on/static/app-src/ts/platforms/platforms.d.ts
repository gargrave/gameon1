declare module App.Platforms {

  export interface IPlatform extends App.Common.IDbEntry {
    name: string;
    color: string;
  }
}
