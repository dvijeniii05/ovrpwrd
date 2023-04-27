import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 100,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <Text>{t('welcome')}</Text>
        <Text>{t('appName')}</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
