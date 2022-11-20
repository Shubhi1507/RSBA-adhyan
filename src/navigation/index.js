import React, {useCallback, useContext, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from './AuthNavigation';
import {App, CoordinatorAuth, TeacherAuth} from './AppNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as i18n from '../../i18n';
import LocalizationContext from '../context/LanguageContext';

const RootStack = createStackNavigator();

function AppNavigation() {
  // let isloggedIn = useSelector(state => state?.authReducer?.loggedIn);
  let isloggedIn = true;
  const {t, locale, setLocale} = useContext(LocalizationContext);
  let x = useSelector(state => state?.authReducer?.loggedIn);

  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      if (res) {
        handleLocalizationChange(res);
      } else {
        handleLocalizationChange('en');
      }
    });
  }, []);

  const handleLocalizationChange = useCallback(
    newLocale => {
      const newSetLocale = i18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale],
  );

  return (
    <RootStack.Navigator initialRouteName={isloggedIn ? 'App' : 'Auth'}>
      {!isloggedIn ? (
        <RootStack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <RootStack.Screen
          name="App"
          component={App}
          options={{
            headerShown: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
}

export default AppNavigation;
