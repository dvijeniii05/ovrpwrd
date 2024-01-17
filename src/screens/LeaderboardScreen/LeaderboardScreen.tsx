import {
  ScrollView,
  StatusBar,
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Gradient from '../../components/Gradient/Gradient';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useHeaderHeight } from '@react-navigation/elements';
import { styles } from './LeaderboardScreen.styles';
import {
  LeaderboardUser,
  useGetLeaderboardQuery,
} from '../../redux/query/apiSlice';
import FramedImage from '../../components/FramedImage/FramedImage';
import CurrencyWrapper, {
  currencyType,
} from '../../components/CurrencyWrapper/CurrencyWraper';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import { COLORS } from '../../constans/COLORS';
import { HEIGHT } from '../../utils/dimension';
import GeneralErrorComponent from '../../components/GeneralErrorComponent/GeneralErrorComponent';
import { useCallback, useMemo, useState } from 'react';
import { parsedLeaderboardData } from '../../utils/leagueHelpers/leagueHelpers';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useReportNicknameMutation } from '../../redux/query/endpoints/supportApi';
import InformationModal from '../Modals/InformationModal/InformationModal';

type NavProps = StackScreenProps<
  StackParamList,
  StackScreenName.leaderboardScreen
>;

const LeaderboardScreen = ({ route }: NavProps) => {
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 40;

  const { userNickname } = route.params;

  const { showActionSheetWithOptions } = useActionSheet();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const [
    reportTrigger,
    {
      isLoading: isReportLoading,
      isSuccess: isReportSuccess,
      isError: isReportError,
    },
  ] = useReportNicknameMutation();

  const { data, isSuccess, isFetching, isError, refetch } =
    useGetLeaderboardQuery();

  const leaderBoard = useMemo(() => {
    return parsedLeaderboardData(false, data, userNickname);
  }, [data, userNickname]);

  const onUserPress = useCallback(
    (nickname: string) => () => {
      const options = [`Report nickname as offensive`, 'Cancel'];
      const destructiveButtonIndex = 0;
      const cancelButtonIndex = 1;
      showActionSheetWithOptions(
        { options, cancelButtonIndex, destructiveButtonIndex },
        (selectedIndex?: number) => {
          if (selectedIndex === cancelButtonIndex) {
            // close actionssheet
          } else {
            // report user
            reportTrigger({ nickname });
            setIsModalVisible(true);
          }
        },
      );
    },
    [leaderBoard?.alteredLeaderboard],
  );

  const renderItem = ({ item, index }: ListRenderItemInfo<LeaderboardUser>) => {
    const isCurrentUser = item.nickname === userNickname ?? false;
    const indexForCurrentUser = isCurrentUser
      ? leaderBoard?.currentUserIndex
      : index + 1;
    return (
      <TouchableOpacity
        style={styles.cardContainer(isCurrentUser)}
        onPress={onUserPress(item.nickname)}>
        <View style={styles.leftSideContainer}>
          <Text style={[styles.text, { marginRight: 24 }]}>
            {indexForCurrentUser}
          </Text>
          <FramedImage
            avatar={item.avatar}
            frameColor="blue"
            frameSize={{ width: 24, height: 24 }}
          />
          <Text style={[styles.text, { marginLeft: 26 }]} numberOfLines={1}>
            {item.nickname}
          </Text>
        </View>
        <CurrencyWrapper
          forLeagueProgression
          currencyType="perks"
          perkWidth={16}
          perkHeight={16}
          value={item.perks}
        />
      </TouchableOpacity>
    );
  };

  const refreshing = false; // static value for RefreshControl as there is no need for the loader logic apart from actual Pull-to-Refresh;

  const onRefresh = useCallback(() => {
    refetch();
  }, []);

  return (
    <View>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.parentContainer}>
        <InformationModal
          isVisible={isModalVisible}
          onPress={() => setIsModalVisible(false)}
          isDataDriven
          isLoading={isReportLoading}
          isError={isReportError}
          isSuccess={isReportSuccess}
        />
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
    </View>
  );
};
export default LeaderboardScreen;
