import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../../navigation/navigationTypes';
import { StackScreenName } from '../../../ScreenNames';
import LoadingComponent from '../../components/LoadingComponent/LoadingComponent';
import { useRegisterUserQuery } from '../../redux/query/endpoints/userApi';

type ScreenProps = StackScreenProps<StackParamList, StackScreenName.steamLogin>;

const SteamLoginScreen = ({ navigation, route }: ScreenProps) => {
  const { isSuccess, isError, isLoading } = useRegisterUserQuery({
    email: 'adikbsw@gmail.com',
    displayName: 'dummy',
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
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: 'white', textAlign: 'center' }}>
              User registered with following email and display name: {email}{' '}
              {displayName}
            </Text>
          </View>
        ) : null}
        {isError ? (
          <Text style={{ color: 'white' }}>Error during registration</Text>
        ) : null}
        <Text style={{ color: 'white' }}>Steam Login</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate(StackScreenName.steamModal)}>
          <Text style={{ color: 'white' }}>Link Steam</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SteamLoginScreen;
