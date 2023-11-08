export interface UserStatsProps {
  matchId: number;
  heroId: 21;
  steamAccountId: 367396390;
  isRadiant: true;
  numKills: 13;
  numDeaths: number;
  numAssists: number;
  leaverStatus: 0;
  numLastHits: 229;
  numDenies: 4;
  goldPerMinute: 529;
  experiencePerMinute: 766;
  level: 25;
  gold: 4852;
  goldSpent: 19795;
  heroDamage: 20974;
  towerDamage: 6982;
  isRandom: false;
  lane: 3;
  intentionalFeeding: false;
  role: 1; //indicates role
  imp: 24;
  award: 1;
  item0Id: 108;
  item1Id: 250;
  item2Id: 1;
  item4Id: 100;
  item5Id: 63;
  backpack0Id: 36;
  heroHealing: 0;
  roamLane: 0;
  isVictory: true;
  networth: 24077;
  neutral0Id: 311;
  dotaPlusHeroXp: 2475;
  invisibleSeconds: 0;
}

export interface MatchStatsProps {
  match_id: number;
  player_slot: number;
  radiant_win: boolean;
  duration: number; // in Seconds
  game_mode: number;
  hero_damage: number;
  hero_healing: number;
  kills: number;
  deaths: number;
  assists: number;
  start_time: number;
}
