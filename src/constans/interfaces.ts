export interface ParsedMatch {
  isWin: boolean;
  hero: number;
  time: number;
  points: number;
  heroUrl: string;
  kills: number;
  deaths: number;
  assists: number;
  matchId: number;
  gameMode: string;
}

export enum leaugeNames {
  legendaryLeague = 'Legendary League',
  mythicalLeague = 'Mythical League',
  immortalLeague = 'Immortal League',
}
