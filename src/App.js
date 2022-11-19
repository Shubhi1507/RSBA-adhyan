/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import React, {useCallback} from 'react';
import {
  LogBox,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Provider as RNPaperProvider} from 'react-native-paper';
import {COLORS} from './utils/colors';
import * as i18n from '../i18n';

import AppNavigation from './navigation';
import {navigationRef} from './navigation/NavigationService';
import Configurestore from './redux/store/store';

const {store, persistor} = Configurestore();

const App = () => {
  const [locale, setLocale] = React.useState(i18n.DEFAULT_LANGUAGE);

  LogBox.ignoreLogs(['Require cycle:', 'console.error:']);

  const localizationContext = React.useMemo(
    () => ({
      t: (scope, options) => i18n.t(scope, {locale, ...options}),
      locale,
      setLocale,
    }),
    [locale],
  );
  const handleLocalizationChange = useCallback(
    newLocale => {
      const newSetLocale = i18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale],
  );

  React.useEffect(() => {
    handleLocalizationChange();
    RNLocalize.addEventListener('change', handleLocalizationChange);
    return () => {
      RNLocalize.removeEventListener('change', handleLocalizationChange);
    };
  }, []);

  return (
    <View style={styles.rootContainer}>
      <RNPaperProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SafeAreaView style={styles.safeAreaContainer}>
              <NavigationContainer ref={navigationRef}>
                <AppNavigation />
              </NavigationContainer>
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </RNPaperProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  safeAreaContainer: {
    flex: 1,
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    // backgroundColor: COLORS.backgroundColor,
  },
});

export default App;
