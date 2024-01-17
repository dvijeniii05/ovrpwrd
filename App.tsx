/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import AppDrawer from './src/navigation/AppDrawer';
import './i18';
import { Provider, useSelector } from 'react-redux';
import { RootState, mainStore, persistor } from './src/redux/store/mainStore';
import { PersistGate } from 'redux-persist/integration/react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheet from './src/components/BottomSheet/BottomSheet';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { COLORS } from './src/constans/COLORS';
import NoNetworkModal from './src/screens/Modals/NoNetworkModal/NoNetworkModal';
import { closeBottomSheet } from './src/redux/slices/userDataSlice';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { vershionCheck } from './src/utils/versionChecker';
import ForceUpdateScreen from './src/screens/ForceUpdateScreen/ForceUpdateScreen';

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

const App = () => {
  useEffect(() => {
    vershionCheck();
    mainStore.dispatch(closeBottomSheet);
  }, []);
  return (
    <Provider store={mainStore}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
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
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
