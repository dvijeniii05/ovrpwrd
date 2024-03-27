/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
import './i18';
import { Provider } from 'react-redux';
import { mainStore, persistor } from './src/redux/store/mainStore';
import { PersistGate } from 'redux-persist/integration/react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { closeBottomSheet } from './src/redux/slices/userDataSlice';
import { vershionCheck } from './src/utils/versionChecker';
import { useAppInit } from './src/utils/useAppInit';
import { init } from '@amplitude/analytics-react-native';
import Root from './Root';
import { amplitudeKey } from './src/constans/amplitude';

const App = () => {
  const { isDone, isError } = useAppInit();
  const [isRehydrated, setIsRehydrated] = useState<boolean>(false);

  useEffect(() => {
    vershionCheck();
    mainStore.dispatch(closeBottomSheet);
  }, []);

  const RenderRoot = useCallback(() => {
    if (isDone && isRehydrated) {
      if (isError) {
        return null; //TODO: create error screen during initation
      }
      console.log('DONE?');
      init(amplitudeKey, undefined, {
        trackingOptions: {
          adid: false,
        },
      });
      return <Root />;
    }
    return null;
  }, [isDone, isError, isRehydrated]);

  return (
    <Provider store={mainStore}>
      <PersistGate
        loading={null}
        persistor={persistor}
        onBeforeLift={() => setIsRehydrated(true)}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          {RenderRoot()}
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
