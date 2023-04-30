import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {styles} from './HomeScreen.style';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/mainStore';

const HomeScreen = () => {
  const {t} = useTranslation();
  const steamData = useSelector((state: RootState) => state.steamAuthReducer);

  return (
    <SafeAreaView style={styles.parentContainer}>
      {steamData.status === 'fulfilled' && (
        <View style={styles.idContainer}>
          <Text>SteamID32: {steamData.steamID}</Text>
        </View>
      )}
      <View style={styles.welcomeContainer}>
        <Text>{t('appName')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
