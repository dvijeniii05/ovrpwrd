import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, Alert} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './HomeScreen.style';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/mainStore';
import {useGetStartingFromMatchDataQuery} from '../../redux/query/apiSlice';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  addPoints,
  fetchRecentGamesData,
  resetPointsDev,
} from '../../redux/slices/userDataSlice';
import {
  ASHRAF_MATCH_DATA,
  DUMMY_MATCH_DATA,
} from '../../constans/gameStatsDummy';

const HomeScreen = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const steamData = useSelector((state: RootState) => state.steamAuth);
  const userData = useSelector((state: RootState) => state.userData);
  const {
    startingGameID,
    startingGameTime,
    matchData,
    firstEverGameID,
    firstEverGameTime,
  } = userData.data;

  const matchDataDummy = DUMMY_MATCH_DATA;
  const ashrafDataDummy = ASHRAF_MATCH_DATA;

  // const {
  //   data: startinMatchData,
  //   isFetching,
  //   isLoading,
  //   isError,
  //   isSuccess,
  // } = useGetStartingFromMatchDataQuery(steamData?.steamID);

  //Add raw statisctics from openDotaApi & calculated value
  //Data should be fetched onPress for now
  //Save start_time of the most recent game and update that value on each fetch
  //Filter is required to fetch only new matches, excluding the ones that were already counted in
  //Fetch using RTKQuery with a key for cache expiry process
  // role: 1 or 2 = supports
  //gameMode: 23 = turbo, 2 = all_draft
  //lobbyType: 5,6,7 = ranking

  const calculatePoints = () => {
    let points = 0;
    if (matchData.length > 0) {
      matchData.map(match => {
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
              ? 0.5 *
                (heroDamagePoints +
                  heroHealPoints +
                  matchResultPoints +
                  kdaPoints)
              : heroDamagePoints +
                heroHealPoints +
                matchResultPoints +
                kdaPoints;
          console.log('KDA', kda, 'KDA_POINTS', kdaPoints);
          console.log(
            'DAMAGE',
            stat.heroDamage,
            'DAMAGE_POINTS',
            heroDamagePoints,
          );
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
              ? 0.5 * (heroDamagePoints + matchResultPoints + kdaPoints)
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
      dispatch(addPoints(points));
    } else {
      console.log('NO_MATCHES');
    }
  };

  return (
    <SafeAreaView style={styles.parentContainer}>
      <LoadingComponent
        loadingText={'Fetching data...'}
        isLoading={userData.status === 'pending' ? true : false}
      />
      {steamData.status === 'fulfilled' && (
        <View style={styles.idContainer}>
          <Text>SteamID32: {steamData.steamID}</Text>
        </View>
      )}
      <View style={styles.welcomeContainer}>
        <Text style={{color: 'white'}}>{t('appName')}</Text>
      </View>
      {userData.status === 'fulfilled' ? (
        <View>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Your stats will be counted starting from this match ID:
            {firstEverGameID}
          </Text>
          <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
            and from this epochTime: {firstEverGameTime}
          </Text>
          <Text style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
            Kajdiy match parsitsya 240 sekund.
          </Text>
        </View>
      ) : null}
      <View>
        <Text style={{color: 'white'}}>
          Current points: {userData.data.points}
        </Text>
        <Text style={{color: 'white'}}>
          Last Game ID: {userData.data.matchData[0]?.id}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => {
          dispatch(
            fetchRecentGamesData({
              steamID32: steamData.steamID,
              fromThisTime: startingGameTime.toString(),
            }),
          );
          calculatePoints();
        }}>
        <Text>REFRESH</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          Alert.alert(
            'Tebe kaef udalit vse ochki?',
            'Vse ochki naxuy sletyat na 0',
            [
              {
                text: 'DA',
                onPress: () => dispatch(resetPointsDev()),
              },
              {
                text: 'NET',
                onPress: () => {},
              },
            ],
          );
        }}>
        <Text>RESET POINTS</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default HomeScreen;
