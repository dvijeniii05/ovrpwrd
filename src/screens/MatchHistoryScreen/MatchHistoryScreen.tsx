import {
  ScrollView,
  StatusBar,
  View,
  Text,
  FlatList,
  ListRenderItemInfo,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

const MatchHistoryScreen = () => {
  const headerHeight = useHeaderHeight();
  const topMargin = headerHeight + 40;

  const one = 9.42;
  const two = 4713;
  const total = one + two * 0.001;
  console.log('TOTAL', total);

  const { data, isFetching, isSuccess, isError, refetch } =
    useGetUserStatsQuery();

  const renderItem = ({ item }: ListRenderItemInfo<ParsedMatch>) => (
    <View style={styles.singleMatchContainer}>
      <Image
        source={{ uri: item.heroUrl }}
        style={{ width: 24, aspectRatio: 1 }}
      />
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Text style={styles.kText}>{item.kills}</Text>
        <Text style={styles.dText}>{item.deaths}</Text>
        <Text style={styles.aText}>{item.assists}</Text>
      </View>
      <View style={{ flexDirection: 'row', minWidth: 52, gap: 4 }}>
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

export default MatchHistoryScreen;
