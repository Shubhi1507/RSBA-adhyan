import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/colors';
import {TextHandler} from './TextHandler';
import {useSelector} from 'react-redux';
import LocalizationContext from '../context/LanguageContext';
import {useContext} from 'react';

export function Header({children}) {
  let store = useSelector(state => state?.surveyReducer?.currentSurveyData);
  const {t} = useContext(LocalizationContext);
  return (
    <View style={styles.container}>
      {children}
      <TextHandler style={{color: COLORS.white}}>
        {store?.centre_id ? `(${t('CENTRE')} - ` + store.centre_id +')': ''}
      </TextHandler>
      {/* <View style={styles.topView}>
        <View style={styles.topInnerView}>{children1}</View>
      </View>
      <View style={styles.bottomView}>
        <View style={styles.bottomInnerView}>{children2 && children2}</View>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  topView: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  topUpperView: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
  topInnerView: {
    flex: 1,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 100,
  },
  bottomView: {
    flex: 1,
    backgroundColor: COLORS.blue,
  },
  bottomInnerView: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 100,
  },
});
