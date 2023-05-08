import {MatchStatsProps} from '../../staticTypes';

export const calculatePoints = (matches: MatchStatsProps[], callback: any) => {
  let points = 0;
  matches.map(match => {
    const stat = match.players[0];
    const isSupport = stat.role == 1 || stat.role == 2;

    if (isSupport) {
      const kda = Math.floor(
        (stat.numKills + 2 * stat.numAssists) / stat.numDeaths,
      ); //round to low decimal
      const heroDamagePoints = (15 * stat.heroDamage) / 1000;
      const heroHealPoints = (10 * stat.heroHealing) / 1000;
      const matchResultPoints = stat.isVictory ? 100 : 40;
      const kdaPoints = kda * 5 + 5;
      points +=
        match.gameMode == 23
          ? 0.5 *
            (heroDamagePoints + heroHealPoints + matchResultPoints + kdaPoints)
          : heroDamagePoints + heroHealPoints + matchResultPoints + kdaPoints;
      console.log('SUPPORT', points);
    } else {
      const kda = Math.floor(
        (stat.numKills + stat.numAssists) / stat.numDeaths,
      ); //round to low decimal
      const heroDamagePoints = (10 * stat.heroDamage) / 1000;
      const matchResultPoints = stat.isVictory ? 100 : 40;
      const kdaPoints = kda * 5 + 5;
      points +=
        match.gameMode == 23
          ? 0.5 * (heroDamagePoints + matchResultPoints + kdaPoints)
          : heroDamagePoints + matchResultPoints + kdaPoints;
      console.log('CORE', points);
    }
  });
  callback(points);
};
