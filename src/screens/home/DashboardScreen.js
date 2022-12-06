import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
} from 'react-native';
import React, {useCallback, useContext} from 'react';
import LoaderIndicator from '../../components/Loader';
import {
  Button,
  CustomCheckbox,
  CustomSnackBar,
  Header,
  TextHandler,
} from '../../components';
import {COLORS} from '../../utils/colors';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import {screenWidth} from '../../libs';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ROUTES} from '../../navigation/RouteConstants';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {useEffect} from 'react';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import LocalizationContext from '../../context/LanguageContext';
import {
  ChangeLanguageAndReboot,
  checkSurveyReleaseDateandReturnCompletedSurveys,
  filterOutIncompleteSurveys,
  filterOutSavedSurveys,
} from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as i18n from '../../../i18n.js';

export default function DashboardScreen() {
  const {t, locale, setLocale} = useContext(LocalizationContext);
  const [error, setError] = useState({visible: false, message: ''});
  const [language, chooseLanguage] = useState({
    default: 'en',
    changed: false,
    label: 'English',
  });
  let [selectedCenter, setCenter] = useState(null);
  const dispatch = useDispatch();
  const store = useSelector(state => state);
  const name = store?.authReducer?.userData?.userData?.data[0]?.name;
  const totalSurveys = store.surveyReducer.totalSurveys;
  const completedSurveysTmpArr =
    checkSurveyReleaseDateandReturnCompletedSurveys(totalSurveys);

  const [CENTER_DATA] = useState([
    {key: '301', value: '301'},
    {key: '302', value: '302'},
    {key: '303', value: '303'},
    {key: '304', value: '304'},
    {key: '305', value: '305'},
  ]);

  useEffect(() => {
    AsyncStorage.getItem('lang').then(res => {
      if (res) {
        if (res === 'en') {
          chooseLanguage({...language, label: 'English', default: 'en'});
        }
        if (res === 'hi') {
          chooseLanguage({...language, label: 'Hindi', default: 'hi'});
        }
        handleLocalizationChange(res);
      } else {
        handleLocalizationChange('en');
      }
    });
  }, []);

  useEffect(() => {
  }, [store.surveyReducer]);

  useEffect(() => {
    dispatch({type: ACTION_CONSTANTS.CLEAR_BASTI_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_DISTRICTS_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_STATE_LIST});
    // dispatch({type: ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY});
  }, []);

  const handleLocalizationChange = useCallback(
    newLocale => {
      const newSetLocale = i18n.setI18nConfig(newLocale);
      setLocale(newSetLocale);
    },
    [locale],
  );

  const pageNavigator = () => {
    if (selectedCenter) {
      console.log('selectedCenter', selectedCenter);
      dispatch({type: ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY});
      navigate(ROUTES.AUTH.CENTREDETAILSONESCREEN, {centre: selectedCenter});
    } else
      return setError({
        visible: true,
        message: t('PLS_SELECT_A_CENTER'),
      });
  };

  const LangugeConverter = data => {
    if (language.default) {
      language.default !== data.value
        ? ChangeLanguageAndReboot(data.value, t)
        : null;
    }
  };

  const HeaderContent = () => {
    return (
      <View
        style={{
          flex: 0.3,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: screenWidth,
        }}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 0.33,
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <ADIcons name="left" color={COLORS.white} size={21} />
          </TouchableOpacity>
          <FAIcons name="user-circle-o" color={COLORS.white} size={21} />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 18}}>
            {t('VOLUNTEER_DASHBOARD')}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
      </View>
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
          paddingHorizontal: 20,
          marginTop: 10,
        }}>
        <TextHandler
          style={{fontWeight: '700', fontSize: 23, paddingBottom: 30}}>
          {`${t('WELCOME')}`} {name && `, ${name}`}
        </TextHandler>
        <TouchableOpacity
          style={{
            flex: 0.12,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TextHandler style={{fontWeight: '400', fontSize: 18}}>
            {t('COMPLETED_SURVEYS')}
          </TextHandler>
          <TextHandler
            style={{
              fontWeight: '400',
              fontSize: 16,
              backgroundColor: 'green',
              color: 'white',
              padding: 8,
            }}>
            {completedSurveysTmpArr.length}
          </TextHandler>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigate(ROUTES.AUTH.INCOMPLETESURVEYSSCREEN);
            dispatch({type: ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY});
          }}
          style={{
            flex: 0.12,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <TextHandler style={{fontWeight: '400', fontSize: 18}}>
            {t('INCOMPLETE_SUVEYS')}
          </TextHandler>

          <View
            style={{
              marginTop: 0,
            }}>
            <TextHandler
              style={{
                fontWeight: '400',
                fontSize: 16,
                color: 'white',
                backgroundColor: 'red',
                padding: 8,
              }}>
              {filterOutIncompleteSurveys(totalSurveys).length || 0}
            </TextHandler>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigate(ROUTES.AUTH.SAVED_SURVEYS_SCREEN)}
          style={{
            flex: 0.12,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View style={{flex: 0.8}}>
            <TextHandler style={{fontWeight: '400', fontSize: 18}}>
              {t('SAVE_REVIEW_QUESTIONS')}
            </TextHandler>
            <Text style={{color: 'grey', fontSize: 12, fontWeight: '400'}}>
              {t('48_HRS_REVIEW')}
            </Text>
          </View>
          <View
            style={{
              marginTop: 0,
            }}>
            <TextHandler
              style={{
                fontWeight: '400',
                fontSize: 16,
                backgroundColor: 'red',
                padding: 8,
                color: 'white',
              }}>
              {filterOutSavedSurveys(totalSurveys).length || 0}
            </TextHandler>
          </View>
        </TouchableOpacity>

        <View style={styles.headingInput}>
          <TextHandler
            style={{fontWeight: '600', fontSize: 18, paddingBottom: 0}}>
            {t('ASSIGNED_CENTRES')}
          </TextHandler>
        </View>
        <View style={{flex: 0.4}}>
          <FlatList
            data={CENTER_DATA}
            renderItem={({item, index}) => {
              return (
                <CustomCheckbox
                  color={COLORS.success}
                  label={`${t('CENTRE')} - ` + item.value}
                  completed={false}
                  status={
                    selectedCenter && selectedCenter?.value
                      ? selectedCenter?.value === item.value
                      : false
                  }
                  attempted={false}
                  onPress={() => {
                    setCenter(item);
                  }}
                  customTextStyle={
                    selectedCenter
                      ? selectedCenter?.value === item.value
                        ? {color: COLORS.buttonColor}
                        : {color: COLORS.black}
                      : {color: COLORS.black}
                  }
                />
              );
            }}
          />
        </View>

        <Button
          title={t('START_SURVEY')}
          onPress={() => {
            pageNavigator();
          }}
          ButtonContainerStyle={{
            alignItems: 'center',
            textAlign: 'center',
          }}
        />
        {/* <Button
          title={'RESET'}
          onPress={() => {
            dispatch({type: ACTION_CONSTANTS.RESET_APP});
          }}
          ButtonContainerStyle={{
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: COLORS.error,
          }}
        /> */}

        <Button
          title={t('LANGUAGE_CHANGE')}
          onPress={() => {
            if (language.default === 'hi') {
              LangugeConverter({label: 'English', value: 'en'});
            } else {
              LangugeConverter({label: 'Hindi', value: 'hi'});
            }
          }}
          ButtonContainerStyle={{
            alignItems: 'center',
            textAlign: 'center',
          }}
        />

        <Button
          title={t('LOGOUT')}
          onPress={() => {
            Alert.alert('Logout?', '', [
              {
                text: 'Yes',
                onPress: () =>
                  dispatch({type: ACTION_CONSTANTS.LOGOUT_REQUEST}),
              },
              {
                text: 'No',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
            ]);
          }}
          ButtonContainerStyle={{
            margin: 20,
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: COLORS.buttonColor,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

    // alignItems: 'center',
  },
  textBox: {
    flex: 0.45,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 10,
    justifyContent: 'flex-start',
  },

  headingInput: {
    color: 'black',
    fontWeight: '500',
    marginTop: 15,
    fontSize: 16,
    margin: 6,
  },

  textInput: {
    height: 40,
    margin: 5,
    borderWidth: 1,
    padding: 10,
    textAlign: 'left',
    color: 'grey',
  },
});
