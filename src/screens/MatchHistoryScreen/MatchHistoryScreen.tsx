import {
  ScrollView,
  StatusBar,
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import Gradient from '../../components/Gradient/Gradient';
import { COLORS } from '../../constans/COLORS';
import { useHeaderHeight } from '@react-navigation/elements';
import { styles } from './MatchHistoryScreen.styles';
import Perks from '../../assets/Perks.svg';
import Relics from '../../assets/Relics.svg';
import { useGetUserStatsQuery } from '../../redux/query/endpoints/userApi';
import { ParsedMatch } from '../../constans/interfaces';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import GeneralErrorComponent from '../../components/GeneralErrorComponent/GeneralErrorComponent';
import { HEIGHT } from '../../utils/dimension';
import { heroIconPicker } from '../../utils/heroIconPicker';
import LinearGradient from 'react-native-linear-gradient';

const MatchHistoryScreen = () => {
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 40;

  const { data, isFetching, isSuccess, isError, refetch } =
    useGetUserStatsQuery();

  // const [refreshing, setIsRefreshing] = useState<boolean>(false); // static value for RefreshControl as there is no need for the loader logic apart from actual Pull-to-Refresh;
  // const debounceRefetch = useDebouncedCallback(() => refetch(), 60000, {
  //   leading: true,
  //   maxWait: 60000,
  //   trailing: false,
  // });
  // const debounceRefreshIndicator = useDebouncedCallback(
  //   () => setIsRefreshing(false),
  //   2000,
  //   {
  //     trailing: true,
  //     leading: false,
  //   },
  // );
  // const onRefresh = useCallback(() => {
  //   setIsRefreshing(true);
  //   debounceRefetch();
  //   debounceRefreshIndicator();
  // }, []);

  const renderItem = ({ item, index }: ListRenderItemInfo<ParsedMatch>) => (
    <View style={styles.singleMatchContainer}>
      <Image source={heroIconPicker(item.heroUrl)} style={styles.heroImage} />
      <View style={styles.kdaContainer}>
        <Text style={styles.kText}>{item.kills}</Text>
        <Text style={styles.dText}>{item.deaths}</Text>
        <Text style={styles.aText}>{item.assists}</Text>
      </View>
      <View style={styles.matchOutcomeContainer}>
        {item.isBonusMatch ? (
          <View style={styles.gradientContainer}>
            <LinearGradient
              useAngle
              angle={80}
              angleCenter={{ x: 0.5, y: 0.5 }}
              colors={['#1BFD9C', '#FFCD4C']}
              style={styles.gradient}>
              <Text style={styles.multiplierText}>x2</Text>
            </LinearGradient>
          </View>
        ) : null}
        <Perks width={16} height={16} />
        <Text style={styles.singleMatchPointsText}>{item.points}</Text>
      </View>

      {item.isWin ? (
        <View style={styles.winWrapper}>
          <View style={styles.winContainer}>
            <Text style={styles.infoText}>WIN</Text>
          </View>
        </View>
      ) : (
        <View style={styles.lossContainer}>
          <Text style={[styles.infoText, { color: COLORS.white }]}>LOSS</Text>
        </View>
      )}
    </View>
  );

  return (
    <View>
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
          style={styles.scroll}
          showsVerticalScrollIndicator={false}>
          {isSuccess ? (
            <>
              <View style={styles.headerContainer(topMargin)}>
                <View style={styles.currencyTopContainer}>
                  <View style={styles.currencyIconContainer}>
                    <Perks width={28} height={28} />
                    <Text style={styles.currencyText}>Perks</Text>
                  </View>
                  <Text style={styles.currencyValueText}>
                    {data.currentPoints.currentPerks}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.currencyBottomContainer}>
                  <View style={styles.currencyIconContainer}>
                    <Relics width={28} height={28} />
                    <Text style={styles.currencyText}>Relics</Text>
                  </View>
                  <Text style={styles.currencyValueText}>
                    {data.currentPoints.currentRelics}
                  </Text>
                </View>
              </View>
              <Text style={styles.infoHeading}>Last 30 matches</Text>
              <FlatList
                data={data?.significantMatches}
                renderItem={renderItem}
                scrollEnabled={false}
                style={styles.flatlistStyle}
                contentContainerStyle={styles.flatlistContainerStyle}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
              />
            </>
          ) : null}
          {isError ? (
            <View style={styles.errorContainer}>
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

export default MatchHistoryScreen;
