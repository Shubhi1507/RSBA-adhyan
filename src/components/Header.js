import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {COLORS} from '../utils/colors';
import {TextHandler} from './TextHandler';
import {useSelector} from 'react-redux';
import LocalizationContext from '../context/LanguageContext';
import {useContext} from 'react';
import {ADIcons, EnIcons, FAIcons} from '../libs/VectorIcons';
import {screenWidth} from '../libs';
import {useEffect} from 'react';
import {navigate} from '../navigation/NavigationService';
import {ROUTES} from '../navigation/RouteConstants';

export function Header({onPressBack, title, home}) {
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
      <View style={{flex: 0.2, alignItems: 'flex-end'}}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: 38, height: 38}}
          resizeMode={'contain'}
        />
        {/* <FAIcons name="user-circle-o" color={COLORS.white} size={21} /> */}
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
        {store?.centre_id && (
          <TextHandler style={{color: COLORS.white, textAlign: 'center'}}>
            {store?.centre_id
              ? `(${t('CENTRE')} - ` +
                store.centre_id +
                ', ' +
                store.center_details.sewakarya_type +
                ')'
              : ''}
          </TextHandler>
        )}
      </View>

      <View style={{flex: 0.2}}>
        {home && (
          <TouchableOpacity
            onPress={() => navigate(ROUTES.AUTH.DASHBOARDSCREEN)}>
            <EnIcons name="home" size={25} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
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
