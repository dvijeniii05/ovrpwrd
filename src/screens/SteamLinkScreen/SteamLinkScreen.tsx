import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {View, Text, TouchableOpacity} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {StackParamList} from '../../navigation/navigationTypes';
import {StackScreenName} from '../../../ScreenNames';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store/mainStore';
import {
  useGetUserDetailsQuery,
  useLinkSteamIDQuery,
} from '../../redux/query/endpoints/userApi';

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.steamLink>;

const SteamLinkScreen = ({navigation, route}: ScreenProps) => {
  const {steamID32} = route.params;
  const email = useSelector((state: RootState) => state.userData.data.email);

  const {isSuccess, isError, isLoading} = useLinkSteamIDQuery({
    email,
    steamID32,
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LoadingComponent isLoading={isLoading} loadingText="Creating user" />
      <View
        style={{
          height: 500,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        {isSuccess ? (
          <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Your Steam ID succesfully linked to your account
            </Text>
          </View>
        ) : null}
        {isError ? (
          <Text style={{color: 'white'}}>Error during Linking</Text>
        ) : null}
        <Text style={{color: 'white'}}>Steam Linking</Text>
        {isSuccess ? (
          <TouchableOpacity onPress={() => {}}>
            <Text style={{color: 'white'}}>Continue</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

export default SteamLinkScreen;
