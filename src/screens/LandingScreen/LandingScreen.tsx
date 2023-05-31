import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StackParamList} from '../../navigation/navigationTypes';
import {StackScreenName} from '../../../ScreenNames';
import {StackScreenProps} from '@react-navigation/stack';

type ScreenProps = StackScreenProps<StackParamList>;

const LandingScreen = ({navigation}: ScreenProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{height: 500, justifyContent: 'space-around'}}>
        <Text style={{color: 'white', textAlign: 'center'}}>
          Register/Login
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(StackScreenName.googleModal)}>
          <Image
            source={require('../../assets/google/googleButton.png')}
            resizeMode="contain"
            style={{width: 200, height: 50}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LandingScreen;
