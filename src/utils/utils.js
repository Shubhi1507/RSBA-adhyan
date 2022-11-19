import React, {useContext} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeRestart from 'react-native-restart'
import { Alert } from "react-native";

export const ChangeLanguageAndReboot = (lang, t) => {
  return Alert.alert(
    '',
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
          AsyncStorage.setItem('lang', lang).then(() => {
            ReactNativeRestart.Restart();
          });
        },
      },
    ],
  );
};
