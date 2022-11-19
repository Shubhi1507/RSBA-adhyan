import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeRestart from 'react-native-restart';
import {Alert} from 'react-native';
import I18n from 'i18n-js';

export const ChangeLanguageAndReboot = (lang, t) => {
  return Alert.alert(
    `${t('LANGUAGE_CHANGE')}`,
    `${t('APP_LANGUAGE_CHANGED')}.\n${t('APP_RESTART_REQUEST')}`,
    [
      {
        text: t('CANCEL'),
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: t('ALLOW'),
        onPress: () => {
          console.log('lang', lang);

          AsyncStorage.setItem('lang', lang).then(() => {
            ReactNativeRestart.Restart();
          });
        },
      },
    ],
  );
};
