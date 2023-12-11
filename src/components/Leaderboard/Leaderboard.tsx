import React, { useMemo } from 'react';
import { FlatList, ListRenderItemInfo, Text, View } from 'react-native';
import { styles } from './Leaderboard.styles';
import FramedImage from '../FramedImage/FramedImage';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import StandardButton from '../Buttons/StandardButton/StandardButton';
import {
  LeaderboardUser,
  useGetLeaderboardQuery,
} from '../../redux/query/apiSlice';
import { Loader } from '../Loaders/Loader';
import { SkeletonLoader } from '../Loaders/SkeletonLoader';
import { Rect } from 'react-content-loader/native';
import { parsedLeaderboardData } from '../../utils/leagueHelpers/leagueHelpers';
import { useNavigation } from '@react-navigation/native';
import { StackProps } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import GeneralErrorComponent from '../GeneralErrorComponent/GeneralErrorComponent';

interface Props {
  isUserFetching: boolean;
  nickname: string | undefined;
  isUserStatsSuccess: boolean;
}

const Leaderboard = (props: Props) => {
  const navigation = useNavigation<StackProps>();
  const { data, isSuccess, isFetching, isError, refetch } =
    useGetLeaderboardQuery(undefined, {
      skip: !props.isUserStatsSuccess,
    });

  const leaderBoard = useMemo(() => {
    return parsedLeaderboardData(true, data, props.nickname);
  }, [data, props.nickname]);

  const renderItem = ({ item, index }: ListRenderItemInfo<LeaderboardUser>) => {
    const isCurrentUser = item.nickname === props.nickname ?? false;
    const indexForCurrentUser = isCurrentUser
      ? leaderBoard?.currentUserIndex
      : index + 1;
    return (
      <View style={styles.cardContainer(isCurrentUser)}>
        <View style={styles.leftSideContainer}>
          <Text style={[styles.text, { marginRight: 24 }]}>
            {indexForCurrentUser}
          </Text>
          <FramedImage
            avatar={item.avatar}
            frameColor="blue"
            frameSize={{ width: 24, height: 24 }}
          />
          <Text style={[styles.text, { marginLeft: 26 }]}>{item.nickname}</Text>
        </View>
        <CurrencyWrapper
          forLeagueProgression
          isPerks
          perkWidth={16}
          perkHeight={16}
          value={item.perks}
        />
      </View>
    );
  };

  const leaderboardLoader = (
    <SkeletonLoader viewBox="0,0,300,200">
      <Rect x="0" y="0" rx="20" width="300" height="200" />
    </SkeletonLoader>
  );

  return (
    <View style={styles.parentContainer}>
      <View style={styles.headingContainer}>
        <Text style={[styles.text, { fontSize: 20 }]}>Monthly Ranking</Text>
        <View style={styles.allUsersContainer}>
          <Text style={[styles.text, { fontFamily: 'Jost-SemiBold' }]}>
            {leaderBoard?.totalUsers}
          </Text>
        </View>
      </View>
      <Loader
        isFetching={isFetching || props.isUserFetching}
        fetchFallback={leaderboardLoader}>
        {isSuccess && props.nickname ? (
          <>
            <FlatList
              data={leaderBoard?.alteredLeaderboard}
              renderItem={renderItem}
              scrollEnabled={false}
              style={styles.boardParentContainer}
              contentContainerStyle={{ gap: 2 }}
            />
            <StandardButton
              buttonText="See more"
              iconName="round-chevron-right"
              onPress={() =>
                props.nickname
                  ? navigation.navigate(StackScreenName.leaderboardScreen, {
                      userNickname: props.nickname,
                    })
                  : undefined
              }
              style={styles.seeMoreButton}
              buttonTextStyle={{ fontSize: 16 }}
            />
          </>
        ) : null}
        {isError ? (
          <GeneralErrorComponent
            refetchFunction={() => {
              refetch();
            }}
            customErrorMessage="Error loading leaderboard"
          />
        ) : null}
      </Loader>
    </View>
  );
};

export default Leaderboard;
