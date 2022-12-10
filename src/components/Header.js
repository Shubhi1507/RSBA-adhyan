import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/colors';
import {TextHandler} from './TextHandler';
import {useSelector} from 'react-redux';
import LocalizationContext from '../context/LanguageContext';
import {useContext} from 'react';
import {ADIcons, FAIcons} from '../libs/VectorIcons';
import {screenWidth} from '../libs';
import {useEffect} from 'react';

export function Header({onPressBack, title}) {
  useEffect(() => {}, []);
  let store = useSelector(state => state?.surveyReducer?.currentSurveyData);
  const {t} = useContext(LocalizationContext);
  useEffect(() => {}, [title, store]);
  return (
    <View style={styles.container}>
      <View style={{flex: 0.2, alignItems: 'center'}}>
        {onPressBack && (
          <TouchableOpacity onPress={onPressBack}>
            <ADIcons name="left" color={COLORS.white} size={21} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 0.1, alignItems: 'flex-end'}}>
        <FAIcons name="user-circle-o" color={COLORS.white} size={21} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: COLORS.white,
            fontWeight: '600',
            fontSize: 20,
            textAlign: 'center',
          }}>
          {title}
        </Text>
        <TextHandler style={{color: COLORS.white, textAlign: 'center'}}>
          {store?.centre_id ? `(${t('CENTRE')} - ` + store.centre_id + ')' : ''}
        </TextHandler>
      </View>

      <View style={{flex: 0.2}}></View>
      <View style={{flex: 0.1}}></View>
    </View>
  );
}

// ||
// !title === 'स्वयंसेवक डैशबोर्ड')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
});
