import { DateTime } from 'luxon';
import { LeaderboardUser, LeagueData } from '../../redux/query/apiSlice';
import { SPECIFIC_COLORS } from '../../constans/COLORS';
import { leaugeNames } from '../../constans/interfaces';

export const activeLeague = (
  leagues: LeagueData[] | undefined,
  currentPerks: number | undefined,
) => {
  if (leagues && currentPerks !== undefined) {
    const immortalLeague = leagues.find(
      league => league.leagueName === leaugeNames.immortalLeague,
    );
    if (immortalLeague?.pointsMax && currentPerks <= immortalLeague?.pointsMax)
      return leagues.find(
        league =>
          league.pointsMin <= currentPerks && league.pointsMax >= currentPerks,
      );
    return immortalLeague;
  }
};

export const prevAndNextLeagueNames = (currentLeagueName: string) => {
  switch (currentLeagueName) {
    case 'Legendary League': {
      return {
        prevLeagueName: 'No League',
        nextLeagueName: 'Legendary',
      };
    }
    case 'Mythical League': {
      return {
        prevLeagueName: 'Legendary',
        nextLeagueName: 'Mythical',
      };
    }
    case 'Immortal League': {
      return {
        prevLeagueName: 'Mythical',
        nextLeagueName: 'Immortal',
      };
    }
  }
};

export const leagueDaysCountdown = (rawEndDate: number | undefined) => {
  if (rawEndDate !== undefined) {
    const endDate = DateTime.fromSeconds(rawEndDate);
    const daysLeft = endDate.diffNow('days').toObject().days?.toFixed();
    const countDownText =
      Number(daysLeft) > 0
        ? `${daysLeft} days left`
        : `League has ended. The Winner will be announced shotly`;

    return countDownText;
  }
};

export const parsedLeaderboardData = (
  allUsers?: LeaderboardUser[],
  nickname?: string,
) => {
  if (nickname && allUsers) {
    const topFive = allUsers.slice(0, 5);
    const currentUser = allUsers.filter(user => user.nickname === nickname);
    const currentUserIndex = allUsers.indexOf(currentUser[0]) + 1;
    const isUserInTopFive =
      topFive.filter(user => user.nickname === nickname).length > 0
        ? true
        : false;

    return {
      alteredLeaderboard: !isUserInTopFive
        ? topFive.concat(currentUser)
        : topFive,
      currentUser: currentUser[0],
      currentUserIndex,
      totalUsers: allUsers.length,
    };
  }
};

export const leagueBarColor = (currentLeagueName?: string) => {
  switch (currentLeagueName) {
    case 'Legendary League':
      return [
        SPECIFIC_COLORS.leagueBarDarkBlue,
        SPECIFIC_COLORS.leagueBarPurple,
      ];
    case 'Mythical League':
      return [SPECIFIC_COLORS.leagueBarGreen, SPECIFIC_COLORS.leagueBarBlue];
    case 'Immortal League':
      return [SPECIFIC_COLORS.leagueBarPink, SPECIFIC_COLORS.leagueBarOrange];
    default:
      return [
        SPECIFIC_COLORS.leagueBarDarkBlue,
        SPECIFIC_COLORS.leagueBarPurple,
      ];
  }
};
