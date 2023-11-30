import {
  ScrollView,
  StatusBar,
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Gradient from '../../components/Gradient/Gradient';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useHeaderHeight } from '@react-navigation/elements';
import { styles } from './LeaderboardScreen.styles';
import {
  LeaderboardUser,
  useGetLeaderboardQuery,
} from '../../redux/query/apiSlice';
import FramedImage from '../../components/FramedImage/FramedImage';
import CurrencyWrapper from '../../components/CurrencyWrapper/CurrencyWraper';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT } from '../../utils/dimension';
import GeneralErrorComponent from '../../components/GeneralErrorComponent/GeneralErrorComponent';
import { useCallback, useMemo } from 'react';
import { parsedLeaderboardData } from '../../utils/leagueHelpers/leagueHelpers';

type NavProps = StackScreenProps<
  StackParamList,
  StackScreenName.leaderboardScreen
>;

const LeaderboardScreen = ({ route }: NavProps) => {
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 40;

  const { userNickname } = route.params;

  const { data, isSuccess, isFetching, isError, refetch } =
    useGetLeaderboardQuery();

  const leaderBoard = useMemo(() => {
    return parsedLeaderboardData(false, data, userNickname);
  }, [data, userNickname]);

  const renderItem = ({ item, index }: ListRenderItemInfo<LeaderboardUser>) => {
    const isCurrentUser = item.nickname === userNickname ?? false;
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
            avatar="2"
            frameColor="blue"
            frameSize={{ width: 24, height: 24 }}
          />
          <Text style={[styles.text, { marginLeft: 26 }]} numberOfLines={1}>
            {item.nickname}
          </Text>
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

  const refreshing = false; // static value for RefreshControl as there is no need for the loader logic apart from actual Pull-to-Refresh;

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  return (
    <SafeAreaView edges={['bottom']}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.parentContainer}>
        <Gradient type="shaded" style={styles.shadedGradient} />
        <Gradient type="noise" style={styles.noiseGradient} />
        <LoadingComponent
          isLoading={isFetching}
          style={{ backgroundColor: COLORS.darkGrey }}
        />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={{ width: '100%' }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {isSuccess ? (
            <>
              <View style={styles.headerContainer(topMargin)}></View>
              <Text style={styles.infoHeading}>Leaderboard</Text>
              <FlatList
                data={leaderBoard?.alteredLeaderboard}
                renderItem={renderItem}
                scrollEnabled={false}
                style={{ width: '100%', marginTop: 16 }}
                contentContainerStyle={{ gap: 8 }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </>
          ) : null}

          {isError ? (
            <View
              style={{
                justifyContent: 'center',
                height: HEIGHT,
              }}>
              <GeneralErrorComponent
                refetchFunction={() => {
                  refetch();
                }}
                isExtraLargeComponent
              />
            </View>
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default LeaderboardScreen;
