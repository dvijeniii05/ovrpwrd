import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from '../../navigation/navigationTypes';
import {StackScreenName} from '../../../ScreenNames';

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.steamLogin>;

const SteamLoginScreen = ({navigation, route}: ScreenProps) => {
  const {email, displayName} = route.params ?? 'note ready yet';
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: 500,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'white'}}>{email}</Text>
          <Text style={{color: 'white'}}>{displayName}</Text>
        </View>
        <Text style={{color: 'white'}}>Steam Login</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(StackScreenName.steamModal)}>
          <Text style={{color: 'white'}}>Link Steam</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SteamLoginScreen;
