import { DateTime } from 'luxon';
import { LeaderboardUser, LeagueData } from '../../redux/query/apiSlice';

export const activeLeague = (
  leagues: LeagueData[] | undefined,
  currentPerks: number | undefined,
) => {
  if (leagues && currentPerks !== undefined) {
    return leagues.find(
      league =>
        league.pointsMin <= currentPerks && league.pointsMax >= currentPerks,
    );
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
