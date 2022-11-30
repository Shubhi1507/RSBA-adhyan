import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeRestart from 'react-native-restart';
import {Alert} from 'react-native';
import I18n from 'i18n-js';
import {useSelector} from 'react-redux';

export const ChangeLanguageAndReboot = (lang, t) => {
  return Alert.alert(`${t('LANGUAGE_CHANGE')}`, `${t('APP_RESTART_REQUEST')}`, [
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
  ]);
};

export const isSurveyExists = (totalSurveys, obj) => {
  let val = false;
  let payload = {};
  totalSurveys.some(function (el, index) {
    if (el.centre_id === obj.centre_id) {
      val = true;
      payload = {...el};
    }
  });
  return {val, payload};
};
export const FindAndUpdate = (totalSurveys, obj) => {
  totalSurveys.some(function (el, index) {
    if (el.centre_id === obj.centre_id) {
      return totalSurveys.splice(index, 1, obj);
    }
  });
  return totalSurveys;
};

export const filterOutIncompleteSurveys = totalSurveys => {
  let tmp = totalSurveys.filter(function (el) {
    return el.isCompleted == false && el.isSaved == false;
  });
  return tmp;
};
