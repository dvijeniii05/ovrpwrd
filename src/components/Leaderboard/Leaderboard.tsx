import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
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
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useReportNicknameMutation } from '../../redux/query/endpoints/supportApi';
import InformationModal from '../../screens/Modals/InformationModal/InformationModal';

interface Props {
  isUserFetching: boolean;
  nickname: string | undefined;
  isUserStatsSuccess: boolean;
}

const Leaderboard = (props: Props) => {
  const navigation = useNavigation<StackProps>();
  const { showActionSheetWithOptions } = useActionSheet();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { data, isSuccess, isFetching, isError, refetch } =
    useGetLeaderboardQuery(undefined, {
      skip: !props.isUserStatsSuccess,
    });

  const [
    reportTrigger,
    {
      isLoading: isReportLoading,
      isSuccess: isReportSuccess,
      isError: isReportError,
    },
  ] = useReportNicknameMutation();

  const leaderBoard = useMemo(() => {
    return parsedLeaderboardData(true, data, props.nickname);
  }, [data, props.nickname]);

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
    const isCurrentUser = item.nickname === props.nickname ?? false;
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

  const leaderboardLoader = (
    <SkeletonLoader viewBox="0,0,300,200">
      <Rect x="0" y="0" rx="20" width="300" height="200" />
    </SkeletonLoader>
  );

  return (
    <View style={styles.parentContainer}>
      <InformationModal
        isVisible={isModalVisible}
        onPress={() => setIsModalVisible(false)}
        isDataDriven
        isLoading={isReportLoading}
        isError={isReportError}
        isSuccess={isReportSuccess}
      />
      <View style={styles.headingContainer}>
        <Text style={[styles.text, { fontSize: 18 }]} numberOfLines={1}>
          Monthly Ranking
        </Text>
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
