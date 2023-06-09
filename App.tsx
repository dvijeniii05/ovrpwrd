/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppDrawer from './src/navigation/AppDrawer';
import './i18';
import {Provider} from 'react-redux';
import {mainStore, persistor} from './src/redux/store/mainStore';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={mainStore}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppDrawer />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
