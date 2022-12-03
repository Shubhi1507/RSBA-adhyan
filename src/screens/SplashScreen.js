import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {COLORS} from '../utils/colors';
import {navigate} from '../navigation/NavigationService';
import {ROUTES} from '../navigation/RouteConstants';
import {connecttoFBD} from '../networking/FirebaseAPI.controller';
import {useDispatch} from 'react-redux';
import {ACTION_CONSTANTS} from '../redux/actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ChangeLanguageAndReboot} from '../utils/utils';
import LocalizationContext from '../context/LanguageContext';
import {CustomCheckbox, Button} from '../components/index';
import * as i18n from '../../i18n.js';

export default function SplashScreen() {
  const [language, chooseLanguage] = useState({
    default: 'en',
    changed: false,
    label: 'English',
  });
  const {t, locale, setLocale} = useContext(LocalizationContext);

  const options = [
    {label: 'Hindi', value: 'hi'},
    {label: 'English', value: 'en'},
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      if (res) {
        if (res === 'en') {
          console.log('english');
          chooseLanguage({...language, label: 'English', default: 'en'});
        }
        if (res === 'hi') {
          console.log('hindi');
          chooseLanguage({...language, label: 'Hindi', default: 'hi'});
        }
        handleLocalizationChange(res);
      } else {
        handleLocalizationChange('en');
      }
    });
  }, []);
  
  useEffect(() => {
    // fetchData();
    dispatch({type: ACTION_CONSTANTS.CLEAR_BASTI_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_DISTRICTS_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_STATE_LIST});
    // checkforAnyInCompleteSurveys();
  }, []);

  const handleLocalizationChange = useCallback(
    newLocale => {
      const newSetLocale = i18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale],
  );

  async function fetchData() {
    let val = await connecttoFBD();
    console.log('-->', val);
  }

  const LangugeConverter = data => {
    if (language.default) {
      language.default !== data.value
        ? ChangeLanguageAndReboot(data.value, t)
        : null;
    }
  };

  return (
    <View style={{backgroundColor: COLORS.backgroundColor, flex: 1}}>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 0.8,
          marginTop: 60,
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: '50%', height: '40%'}}
          resizeMode={'contain'}></Image>

        <Text
          style={{
            color: COLORS.fontColor,
            fontWeight: '500',
            fontSize: 22,
            marginTop: 20,
            textAlign: 'center',
          }}>
          {t('RSB')}
        </Text>
        <Text
          style={{
            color: COLORS.fontColor,
            fontWeight: '500',
            fontSize: 22,
            marginTop: 3,
            textAlign: 'center',
          }}>
          {t('ADHAYAN')}
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <FlatList
            data={options}
            // horizontal
            renderItem={({item, index}) => {
              return (
                <Button
                  ButtonContainerStyle={{
                    marginBottom: 20,
                  }}
                  title={t(item.label.toUpperCase())}
                  onPress={() => LangugeConverter(item)}
                  key={index}
                />
              );
            }}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigate(ROUTES.AUTH.LOGINSCREEN)}
          style={{
            backgroundColor: COLORS.buttonColor,
            alignSelf: 'center',
            borderRadius: 6,
            width: '80%',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              alignItems: 'center',
              color: 'white',
              fontWeight: '500',
              fontSize: 18,
              textAlign: 'center',
            }}>
            {`${t('VOLUNTEER')}`} {`${t('LOGIN')}`}
          </Text>
        </TouchableOpacity>

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '500',
            }}>
            New Volunteer ?
          </Text>

          <TouchableOpacity
            onPress={() => navigate(ROUTES.AUTH.VOLUNTEERSIGNUPSCREEN)}>
            <Text
              style={{
                color: COLORS.buttonColor,
                fontWeight: '700',
                fontSize: 16,
              }}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
}