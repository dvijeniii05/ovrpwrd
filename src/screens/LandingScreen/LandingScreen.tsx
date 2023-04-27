import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackParamList} from '../../navigation/navigationTypes';
import {StackScreenName} from '../../../ScreenNames';
import {StackScreenProps} from '@react-navigation/stack';

type ScreenProps = StackScreenProps<StackParamList>;

const LandingScreen = ({navigation}: ScreenProps) => {
  const {t} = useTranslation();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{height: 500, justifyContent: 'space-around'}}>
        <Text>Steam Login</Text>
        <TextInput />
        <TouchableOpacity
          onPress={() => navigation.navigate(StackScreenName.home)}>
          <Text>Link Steam</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
