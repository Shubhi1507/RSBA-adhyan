import React, {useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactNativeRestart from 'react-native-restart';
import {Alert} from 'react-native';
import I18n from 'i18n-js';
import {useSelector} from 'react-redux';
import LocalizationContext from '../context/LanguageContext';

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
        AsyncStorage.setItem('lang', lang).then(() => {
          ReactNativeRestart.Restart();
        });
      },
    },
  ]);
};

export const StringModifierWithFilter = (str: String) => {
  const {t} = React.useContext(LocalizationContext);
  let label = str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ /g, '_')
    .toUpperCase();
  let j = t(label);
  if (j.includes('missing')) return label;
  else return j;
};

export const StringModifier = (str: String) => {
  let k = str
    .replace(/[^a-zA-Z0-9 ]/g, '')
    .replace(/ /g, '_')
    .toUpperCase();
  return k;
};

export const isSurveyExists = (totalSurveys, obj) => {
  console.log(totalSurveys, obj);

  let val = false;
  let payload = {};
  if (totalSurveys && Array.isArray(totalSurveys) && totalSurveys.length > 0) {
    totalSurveys.forEach(function (el, index) {
      if (el.centre_id === obj.centre_id) {
        val = true;
        payload = {...el};
      }
    });
  }
  return {val, payload};
};

export const isSurveyExists2 = (totalSurveys, obj) => {
  let j = [];
  let k = false;
  if (totalSurveys && Array.isArray(totalSurveys) && totalSurveys.length > 0) {
    j = totalSurveys.filter(el => el.centre_id === obj.survey_form_id);
  }
  k = j.length > 0 ? true : false;
  return {j, k};
};

export const FindAndUpdate = (totalSurveys, obj) => {
  let tmp = [];
  if (totalSurveys && Array.isArray(totalSurveys) && totalSurveys.length > 0) {
    tmp = totalSurveys.some(function (el, index) {
      if (el.centre_id === obj.centre_id) {
        return totalSurveys.splice(index, 1, obj);
      }
    });
    return totalSurveys;
  }
  return tmp;
};

export const filterOutIncompleteSurveys = totalSurveys => {
  let tmp = [];
  if (totalSurveys && Array.isArray(totalSurveys) && totalSurveys.length > 0) {
    tmp = totalSurveys.filter(function (el) {
      return el.isCompleted == false && el.isSaved == false;
    });
  }
  return tmp;
};

export const filterOutSavedSurveys = totalSurveys => {
  let tmp = [];
  if (totalSurveys && Array.isArray(totalSurveys) && totalSurveys.length > 0) {
    tmp = totalSurveys.filter(function (el) {
      return el.isSaved == true && el.isCompleted == false;
    });
  }
  return tmp;
};

export const filterOutCompletedSurveys = totalSurveys => {
  let tmp = [];
  if (totalSurveys && Array.isArray(totalSurveys) && totalSurveys.length > 0) {
    tmp = totalSurveys.filter(function (el) {
      return el.isCompleted == true;
    });
  }

  return tmp;
};

export const checkInReviewSurveyAndReturnRemaingingTime = totalSurveys => {
  let tmp = [];
  if (totalSurveys && Array.isArray(totalSurveys) && totalSurveys.length > 0) {
    tmp = totalSurveys.filter(function (el) {
      if (el.isSaved === true && el?.isCompleted) {
        if (new Date(el.release_date).getTime() - new Date().getTime() > 0) {
          return el;
        }
      }
    });
    return tmp;
  }
  return tmp;
};

export const findMinimumTimeLeft = totalSurveys => {
  let tmp = null;
  let time = '';
  if (totalSurveys && Array.isArray(totalSurveys) && totalSurveys.length > 0) {
    let tmpArr = totalSurveys.filter(function (el) {
      if (el.isSaved && !el.isCompleted && el?.release_date) {
        return el;
      }
    });
    if (tmpArr.length == 1) {
      tmp = tmpArr[0];
    }
    if (tmpArr.length > 2) {
      tmp = tmpArr.reduce(function (prev, curr) {
        if (prev.isSaved && curr.isSaved) {
          prev.release_date < curr.release_date ? prev : curr;
        }
      });
    }
    if (tmp) {
      const total = Date.parse(tmp.release_date) - Date.parse(new Date());
      if (total > 0) {
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor(total / (1000 * 60 * 60));
        time = hours + ':' + minutes + '';
      }
    }
  }
  console.log('time', time);
  return time;
};
