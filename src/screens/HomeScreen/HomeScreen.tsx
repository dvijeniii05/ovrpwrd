import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, Alert, TextInput, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './HomeScreen.style';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/mainStore';
import {
  useGetCurentLeaguesQuery,
  useLinkSteamIDQuery,
} from '../../redux/query/apiSlice';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  fetchCustomMatchData,
  fetchRecentGamesData,
  resetPointsDev,
} from '../../redux/slices/userDataSlice';
import {
  ASHRAF_MATCH_DATA,
  DUMMY_MATCH_DATA,
} from '../../constans/gameStatsDummy';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {LeagueCard} from '../../components/LeagueCard/LeagueCard';

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
    points,
    email,
  } = userData.data;

  const matchDataDummy = DUMMY_MATCH_DATA;
  const ashrafDataDummy = ASHRAF_MATCH_DATA;

  const [customMatchId, setCustomMatchId] = useState<string>('');

  const {
    data: currentLeaguesData,
    isFetching,
    isLoading,
    isError,
    isSuccess,
  } = useGetCurentLeaguesQuery();

  const {isFetching: steamLinkFetching, isSuccess: steamLinkSuccess} =
    useLinkSteamIDQuery({email, steamID32: steamData.steamID});

  //Add raw statisctics from openDotaApi & calculated value
  //Data should be fetched onPress for now
  //Save start_time of the most recent game and update that value on each fetch
  //Filter is required to fetch only new matches, excluding the ones that were already counted in
  //Fetch using RTKQuery with a key for cache expiry process
  // role: 1 or 2 = supports
  //gameMode: 23 = turbo, 2 = all_draft
  //lobbyType: 5,6,7 = ranking
  console.log('isSuccess', isSuccess);
  console.log('isFetching', isFetching);
  console.log('isError', isError);

  const relicPoints = (points / 1000).toFixed(2);

  return (
    <SafeAreaView style={styles.parentContainer}>
      <LoadingComponent
        loadingText={'Fetching data...'}
        isLoading={userData.status === 'pending' ? true : false}
      />
      {steamLinkSuccess ? (
        <KeyboardAwareScrollView contentContainerStyle={styles.parentContainer}>
          {steamData.status === 'fulfilled' && (
            <View style={styles.idContainer}>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: 'white'}}>{points}</Text>
                <Image
                  source={require('../../assets/bad1.png')}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
                <Text style={{color: 'white', marginLeft: 8}}>
                  {relicPoints}
                </Text>
                <Image
                  source={require('../../assets/good2.png')}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
              </View>
              <Text style={{color: 'black', backgroundColor: 'green'}}>
                ID: {steamData.steamID}
              </Text>
            </View>
          )}
          <View style={styles.welcomeContainer}>
            <Text style={{color: 'white'}}>{t('appName')}</Text>
          </View>
          <>
            {isSuccess ? (
              <LeagueCard leagueData={currentLeaguesData} userPoints={points} />
            ) : null}
            {isError ? (
              <Text style={{textAlign: 'center', color: 'white'}}>
                Failed fethcing leagues
              </Text>
            ) : null}
          </>
          {userData.status === 'fulfilled' ? (
            <View>
              <Text style={{textAlign: 'center', color: 'white'}}>
                Your stats will be counted starting from this match ID:
                {firstEverGameID}
              </Text>
              <Text
                style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
                and from this epochTime: {firstEverGameTime}
              </Text>
              <Text
                style={{textAlign: 'center', marginTop: 10, color: 'white'}}>
                Kajdiy match parsitsya 240 sekund.
              </Text>
            </View>
          ) : null}
          <View>
            <Text style={{color: 'white'}}>Current points: {points}</Text>
            <Text style={{color: 'white'}}>Last Game ID: {startingGameID}</Text>
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
            }}>
            <Text style={{color: 'black'}}>REFRESH</Text>
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
            <Text style={{color: 'black'}}>RESET POINTS</Text>
          </TouchableOpacity>
          <View style={styles.recalContainer}>
            <TextInput
              placeholder="from this gameID"
              style={{backgroundColor: 'white', color: 'black'}}
              onChangeText={text => setCustomMatchId(text)}
            />
            <TouchableOpacity
              style={styles.recalcButton}
              onPress={() =>
                dispatch(fetchCustomMatchData({matchID: customMatchId}))
              }>
              <Text style={{color: 'white'}}>Recalculate</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      ) : null}
    </SafeAreaView>
  );
};

export default HomeScreen;
