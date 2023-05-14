import {MatchStatsProps} from '../../staticTypes';

export const calculatePoints = (matches: MatchStatsProps[]) => {
  let points = 0;
  console.log(matches.length);
  matches.map(match => {
    const stat = match.players[0];
    const isSupport = stat.role == 1 || stat.role == 2;
    const deathCorrection = stat.numDeaths == 0 ? 1 : stat.numDeaths;

    if (isSupport) {
      const kda = Math.floor(
        (stat.numKills + 2 * stat.numAssists) / deathCorrection,
      ); //round to low decimal
      const heroDamagePoints = Math.round((3 * stat.heroDamage) / 1000);
      const heroHealPoints = Math.round((10 * stat.heroHealing) / 1000);
      const matchResultPoints = stat.isVictory ? 100 : 40;
      const kdaPoints = kda * 2 + 2;
      points +=
        match.gameMode == 23
          ? Math.floor(
              0.5 *
                (heroDamagePoints +
                  heroHealPoints +
                  matchResultPoints +
                  kdaPoints),
            )
          : heroDamagePoints + heroHealPoints + matchResultPoints + kdaPoints;
      console.log('KDA', kda, 'KDA_POINTS', kdaPoints);
      console.log('DAMAGE', stat.heroDamage, 'DAMAGE_POINTS', heroDamagePoints);
      console.log('HEAL', heroHealPoints);
      console.log('RESULT', matchResultPoints);
      console.log('SUPPORT', points);
    } else {
      const kda = Math.floor(
        (stat.numKills + stat.numAssists) / deathCorrection,
      ); //round to low decimal
      const heroDamagePoints = Math.round((2 * stat.heroDamage) / 1000);
      const matchResultPoints = stat.isVictory ? 100 : 40;
      const kdaPoints = kda * 2 + 2;
      points +=
        match.gameMode == 23
          ? Math.floor(0.5 * (heroDamagePoints + matchResultPoints + kdaPoints))
          : heroDamagePoints + matchResultPoints + kdaPoints;
      // console.log('KDA', kda, 'KDA_POINTS', kdaPoints);
      // console.log(
      //   'DAMAGE',
      //   stat.heroDamage,
      //   'DAMAGE_POINTS',
      //   heroDamagePoints,
      // );
      // console.log('MATCH_RESULT', matchResultPoints);
      // console.log('TOTAL_CORE', points);
    }
  });
  return points;
  // dispatch(addPoints(points));
};
