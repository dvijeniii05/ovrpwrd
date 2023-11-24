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
import React from 'react';
import AppDrawer from './src/navigation/AppDrawer';
import './i18';
import { Provider } from 'react-redux';
import { mainStore, persistor } from './src/redux/store/mainStore';
import { PersistGate } from 'redux-persist/integration/react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import BottomSheet from './src/components/BottomSheet/BottomSheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from 'react-native-bootsplash';
import { COLORS } from './src/constans/COLORS';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: COLORS.darkBlue,
  },
};

const App = () => {
  return (
    <Provider store={mainStore}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <NavigationContainer
            onReady={() => {
              BootSplash.hide();
            }}
            theme={MyTheme}>
            <AppDrawer />
          </NavigationContainer>
          <BottomSheetModalProvider>
            <BottomSheet />
          </BottomSheetModalProvider>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
