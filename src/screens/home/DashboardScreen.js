import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  Image,
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
import {ADIcons, EnIcons, FAIcons} from '../../libs/VectorIcons';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import LocalizationContext from '../../context/LanguageContext';
import {
  ChangeLanguageAndReboot,
  checkInReviewSurveyAndReturnRemaingingTime,
  filterOutIncompleteSurveys,
  filterOutSavedSurveys,
  findMinimumTimeLeft,
  isSurveyExists,
  isSurveyExists2,
} from '../../utils/utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as i18n from '../../../i18n.js';
import {images} from '../../assets';
import {Menu} from 'react-native-paper';
import {LatestVolunteerData} from '../../networking/API.controller';

export default function DashboardScreen({route, navigation}) {
  const {t, locale, setLocale} = useContext(LocalizationContext);
  const [error, setError] = useState({
    visible: false,
    message: '',
    type: 'error',
  });
  const [language, chooseLanguage] = useState({
    default: 'en',
    changed: false,
    label: 'English',
  });
  let [selectedCenter, setCenter] = useState(null);
  const dispatch = useDispatch();
  const store = useSelector(state => state);
  const name = store?.authReducer?.userData?.userData?.data?.user?.fullname;
  const totalSurveys = store.surveyReducer.totalSurveys;
  const [visible, setVisible] = React.useState(false);
  const [assignedCenters, setAssignedCentres] = useState([]);

  const completedSurveysTmpArr =
    checkInReviewSurveyAndReturnRemaingingTime(totalSurveys);
  const [ReviewTimeLeft, setReviewTimeLeft] = useState('');
  const [CENTER_DATA] = useState([
    {key: '301', value: '301'},
    {key: '302', value: '302'},
    {key: '303', value: '303'},
    {key: '304', value: '304'},
    {key: '305', value: '305'},
  ]);

  useEffect(() => {
    console.log('complete store', store);

    getLatestAssignCenters();

    if (
      store.centerReducer?.assignedCenters &&
      Array.isArray(store.centerReducer?.assignedCenters)
    ) {
      setAssignedCentres(store.centerReducer.assignedCenters);
    }
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
    const focus = navigation.addListener('focus', () => {
      let x = findMinimumTimeLeft(totalSurveys);
      if (x) {
        setReviewTimeLeft(x.toString());
      } else setReviewTimeLeft('');
    });
    return focus;
  }, [store.surveyReducer, navigation]);

  useEffect(() => {
    dispatch({type: ACTION_CONSTANTS.CLEAR_BASTI_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_DISTRICTS_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_STATE_LIST});
    dispatch({type: ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY});
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
      let {k, j} = isSurveyExists2(totalSurveys, selectedCenter);
      console.log('k', k, j[0]);
      if (k == true) {
        if (j[0].isCompleted == false) {
          return setError({
            visible: true,
            message: t('SURVEY_EXISTS'),
          });
        } else {
          return setError({
            visible: true,
            type: 'ok',
            message: t('COMPLETED_SURVEYS'),
          });
        }
      } else {
        dispatch({type: ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY});
        navigate(ROUTES.AUTH.CENTREDETAILSONESCREEN, {centre: selectedCenter});
      }
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
  const getLatestAssignCenters = async () => {
    const loginInfo = store?.authReducer?.userData?.userData?.loginInfo;
    console.log(loginInfo);

    let response = await LatestVolunteerData(loginInfo);
    console.log(response.data.assigned_center);
    setAssignedCentres(response.data.assigned_center);
  };

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header title={t('VOLUNTEER_DASHBOARD')} />
      </View>
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        type={error.type}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View
        style={{
          flex: 0.9,
          justifyContent: 'space-around',
          paddingHorizontal: 20,
          marginTop: 10,
        }}>
        <View
          style={{
            flex: 0.25,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // alignItems: 'center',
            marginBottom: 10,
          }}>
          <View style={{flex: 0.9, alignItems: 'flex-start', paddingTop: 5}}>
            <TextHandler
              style={[styles.title, {textTransform: 'capitalize', flex: 1}]}>
              {`${t('WELCOME')}`}, {name && `${name}`}
            </TextHandler>
          </View>
          <View>
            <Menu
              visible={visible}
              onDismiss={closeMenu}
              anchor={
                <TouchableOpacity
                  onPress={openMenu}
                  style={styles.languageToggler}>
                  <TextHandler style={{textTransform: 'uppercase'}}>
                    {language.default}
                  </TextHandler>
                  <ADIcons name="down" size={18}></ADIcons>
                </TouchableOpacity>
              }>
              <Menu.Item
                onPress={() => {
                  LangugeConverter({label: 'English', value: 'en'});
                  closeMenu();
                }}
                title="English"
              />
              <Menu.Item
                onPress={() => {
                  closeMenu();
                  LangugeConverter({label: 'Hindi', value: 'hi'});
                }}
                title="Hindi"
              />
            </Menu>
          </View>

          {/* <Button
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
          /> */}
        </View>
        <TextHandler style={styles.subtitle}>
          {`${t('ALL_SURVEYS')}`}
        </TextHandler>

        <View
          style={{
            flex: 0.4,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              backgroundColor: COLORS.tile,
              borderRadius: 10,
              flex: 0.3,
              paddingHorizontal: 5,
              paddingVertical: 10,
              alignItems: 'center',
            }}
            onPress={() => navigate(ROUTES.AUTH.COMPLETEDSURVEYSSCREEN)}>
            <View style={{flex: 1}}>
              <TextHandler style={styles.subheading}>
                {t('COMPLETED_SURVEYS')}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={images.check}
                  style={{height: 20, width: 20}}
                  resizeMode="contain"
                />
                <TextHandler style={styles.count}>
                  {completedSurveysTmpArr.length}
                </TextHandler>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              backgroundColor: COLORS.tile,
              borderRadius: 10,
              flex: 0.3,
              paddingHorizontal: 5,
              paddingVertical: 10,
              alignItems: 'center',
            }}
            onPress={() => {
              navigate(ROUTES.AUTH.INCOMPLETESURVEYSSCREEN);
              dispatch({type: ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY});
            }}>
            <View style={{flex: 1}}>
              <TextHandler style={styles.subheading}>
                {t('INCOMPLETE_SUVEYS')}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={images.error}
                  style={{height: 20, width: 20}}
                  resizeMode="contain"
                />
                <TextHandler style={styles.count}>
                  {filterOutIncompleteSurveys(totalSurveys).length || 0}
                </TextHandler>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              justifyContent: 'space-between',
              backgroundColor: '#FCE4CD',
              borderRadius: 10,
              flex: 0.3,
              paddingHorizontal: 5,
              paddingVertical: 10,
              alignItems: 'center',
            }}
            onPress={() => {
              navigate(ROUTES.AUTH.SAVED_SURVEYS_SCREEN);
              dispatch({type: ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY});
            }}>
            <View style={{flex: 1}}>
              <TextHandler style={[styles.subheading, {padding: 0}]}>
                {t('SAVE_REVIEW_QUESTIONS')}
              </TextHandler>
              <View>
                <TextHandler
                  style={[
                    styles.subheading,
                    {
                      fontSize: 12,
                      paddingVertical: 0,
                      textTransform: 'lowercase',
                    },
                  ]}>
                  {ReviewTimeLeft
                    ? ReviewTimeLeft + ' ' + 'hr ' + t('LEFT')
                    : ''}
                </TextHandler>
              </View>
            </View>

            <View
              style={{
                flex: 0.5,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Image
                  source={images.time}
                  style={{height: 20, width: 20}}
                  resizeMode="contain"
                />
                <TextHandler style={styles.count}>
                  {filterOutSavedSurveys(totalSurveys).length || 0}
                </TextHandler>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.headingInput}>
          <TextHandler
            style={{fontWeight: '600', fontSize: 18, paddingBottom: 0}}>
            {t('ASSIGNED_CENTRES')}
          </TextHandler>
        </View>
        <View style={{flex: 0.7, marginBottom: 20}}>
          <FlatList
            data={assignedCenters}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setCenter(item);
                  }}
                  style={{
                    flex: 1,
                    marginVertical: 9,
                    backgroundColor: COLORS.tile,
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'center',
                  }}>
                  <View style={{flex: 0.15, paddingTop: 8}}>
                    {selectedCenter?.survey_form_id == item?.survey_form_id ? (
                      <ADIcons
                        name="checkcircleo"
                        color={COLORS.blue}
                        size={20}
                      />
                    ) : (
                      <EnIcons name="circle" color={COLORS.blue} size={20} />
                    )}
                  </View>
                  {/* other labels */}
                  <View style={{flex: 1}}>
                    <View style={{flex: 0.8, flexDirection: 'row'}}>
                      <View
                        style={{
                          flex: 1,
                          paddingVertical: 5,
                        }}>
                        <TextHandler
                          style={{
                            fontSize: 16,
                            fontWeight: '400',
                            lineHeight: 22,
                            color:
                              selectedCenter?.survey_form_id ==
                              item.survey_form_id
                                ? COLORS.blue
                                : COLORS.black,
                          }}>
                          {`${t('CENTRE')} - ` + item.survey_form_id}
                        </TextHandler>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
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
        <Button
          title={t('LOGOUT')}
          onPress={() => {
            Alert.alert(t('LOGOUT') + '?', '', [
              {
                text: 'Yes',
                onPress: () => dispatch({type: ACTION_CONSTANTS.RESET_APP}),
              },
              {
                text: 'No',
                onPress: () => {},
                style: 'cancel',
              },
            ]);
          }}
          ButtonContainerStyle={{
            marginVertical: 20,
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: COLORS.white,
            borderWidth: 1,
            borderColor: COLORS.orange,
          }}
          textstyle={{
            color: COLORS.orange,
          }}
        />
{/* 
        <Button
          title={'RESET'}
          onPress={() => {
            dispatch({type: ACTION_CONSTANTS.CLEAR_SURVEY_DATA});
          }}
          ButtonContainerStyle={{
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: COLORS.error,
          }}
        /> */}
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

  title: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 22,
    color: '#0B2E6A',
  },
  subtitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 18,
    color: '#0B2E6A',
    marginBottom: 20,
  },
  subheading: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 16,
    color: '#414141',
  },
  count: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 25,
    color: COLORS.blue,
  },
  languageToggler: {
    flexDirection: 'row',
    backgroundColor: COLORS.tile,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
