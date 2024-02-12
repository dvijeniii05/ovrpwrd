import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import './i18';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheet from './src/components/BottomSheet/BottomSheet';
import BootSplash from 'react-native-bootsplash';
import NoNetworkModal from './src/screens/Modals/NoNetworkModal/NoNetworkModal';
import { COLORS } from './src/constans/COLORS';
import { useSelector } from 'react-redux';
import { RootState } from './src/redux/store/mainStore';
import ForceUpdateScreen from './src/screens/ForceUpdateScreen/ForceUpdateScreen';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AppDrawer from './src/navigation/AppDrawer';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.darkBlue,
  },
};

const AppView = () => {
  const isUpdateRequired = useSelector(
    (state: RootState) => state.userData.data.isAppUpdateRequired,
  );
  return isUpdateRequired ? (
    <ForceUpdateScreen /> // FORCE UPDATE SCREEN
  ) : (
    <ActionSheetProvider>
      <AppDrawer />
    </ActionSheetProvider>
  );
};

const Root = () => {
  return (
    <>
      <NavigationContainer
        onReady={() => {
          BootSplash.hide();
        }}
        theme={MyTheme}>
        <AppView />
      </NavigationContainer>
      <NoNetworkModal />
      <BottomSheetModalProvider>
        <BottomSheet />
      </BottomSheetModalProvider>
    </>
  );
};

export default Root;
