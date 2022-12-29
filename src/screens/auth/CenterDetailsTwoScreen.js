import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  Platform,
  Alert,
} from 'react-native';
import React, {useContext} from 'react';
import {screenWidth} from '../../libs';
import {
  Button,
  CustomSnackBar,
  CustomSwitch,
  Header,
  Input,
  RadioButtons,
  TextHandler,
} from '../../components/index';
import {COLORS} from '../../utils/colors';
import {goBack, navigate} from '../../navigation/NavigationService';
import {useState} from 'react';
import {STRINGS} from '../../constants/strings';
import DatePicker from 'react-native-datepicker';
import {ROUTES} from '../../navigation/RouteConstants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {RadioButton, Snackbar} from 'react-native-paper';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {ADIcons, EnIcons, FAIcons} from '../../libs/VectorIcons';
// import Geolocation from '@react-native-community/geolocation';
import Geolocation from 'react-native-geolocation-service';

import {getDistance, getPreciseDistance} from 'geolib';
import {FindAndUpdate} from '../../utils/utils';
import LocalizationContext from '../../context/LanguageContext';

export default function CenterDetailsTwoScreen() {
  const store = useSelector(state => state?.surveyReducer);
  const userStore = useSelector(state => state?.authReducer);
  const {t} = useContext(LocalizationContext);
  let totalSurveys = store.totalSurveys;
  const dispatch = useDispatch();
  const [isCenterOperational, setCenterOperational] = useState(true);
  const [volunteerInfo, setvolunteerInfo] = useState({
    parent_org: '',
    type_of_center: '',
    center_head: '',
    center_contact: '',
    volunteer_location: {},
    is_centre_operational: true,
    non_operational_due_to: '',
  });
  const globalStore = useSelector(state => state);
  const [locationPermissionError, setLocationPermissionError] = useState(false);

  const [miscControllers] = useState({
    CENTRES: [
      {
        key: 'Balsanskaar Kendra',
        value: 'Balsanskaar Kendra',
        label: 'BALSANSKAR_KENDRA',
      },
      {
        key: 'Abyasika',
        value: 'Abyasika',
        label: 'ABYASIKA',
      },
      {
        key: 'Pathdaan Centre',
        value: 'Pathdaan Centre',
        label: 'PATHDAAN_CENTRE',
      },
      {
        key: 'Bal Gokulam',
        value: 'Bal Gokulam',
        label: 'BAL_GOKULAM',
      },
      {
        key: 'Balwadi',
        value: 'Balwadi',
        label: 'BALWADI',
      },
    ],
  });

  let [error, setError] = useState({visible: false, message: ''});

  useEffect(() => {
    CheckSurveyviaParams();
  }, []);

  const CheckSurveyviaParams = () => {
    if (
      store &&
      store?.currentSurveyData &&
      Object.keys(store?.currentSurveyData).length > 0
    ) {
      let staledata = store;
      let isCentreOperational =
        store.currentSurveyData?.center_details?.is_centre_operational;
      setvolunteerInfo(staledata?.currentSurveyData?.center_details);
      setCenterOperational(isCentreOperational);
    }
  };

  const getLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Geolocation Permission',
            message: 'Can we access your location?',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === 'granted') {
          requestLocationPermission();
          return true;
        } else {
          getLocationPermission();
          return false;
        }
      } else {
        requestLocationPermission();
      }
    } catch (err) {
      console.log('error', err);
      setError({
        ...error,
        message: t('SOMETHING_WENT_WRONG'),
        visible: true,
      });
      return false;
    }
  };
  const requestLocationPermission = () => {
    Geolocation.getCurrentPosition(
      position => {
        setLocationPermissionError(false);
        setvolunteerInfo({
          ...volunteerInfo,
          volunteer_location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            time: position.timestamp,
          },
        });
      },
      error => {
        // See error code charts below.
        setLocationPermissionError(true);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  function getAge(fromdate, todate) {
    let doe = fromdate;
    if (todate) todate = new Date(todate);
    else todate = new Date();
    var age = [],
      fromdate = new Date(fromdate),
      y = [todate.getFullYear(), fromdate.getFullYear()],
      ydiff = y[0] - y[1],
      m = [todate.getMonth(), fromdate.getMonth()],
      mdiff = m[0] - m[1],
      d = [todate.getDate(), fromdate.getDate()],
      ddiff = d[0] - d[1];

    if (mdiff < 0 || (mdiff === 0 && ddiff < 0)) --ydiff;
    if (mdiff < 0) mdiff += 12;
    if (ddiff < 0) {
      fromdate.setMonth(m[1] + 1, 0);
      ddiff = fromdate.getDate() - d[1] + d[0];
      --mdiff;
    }
    if (ydiff > 0) age.push(ydiff + ' year' + (ydiff > 1 ? 's ' : ' '));
    if (mdiff > 0) age.push(mdiff + ' month' + (mdiff > 1 ? 's' : ''));
    if (mdiff < 0) mdiff += 11;
    if (ddiff > 0) age.push(ddiff + ' day' + (ddiff > 1 ? 's' : ''));
    if (age.length > 1) age.splice(age.length - 1, 0, ' and ');
    return age.join('');
  }

  function PageValidator() {
    const {
      center_contact,
      center_head,
      parent_org,
      type_of_center,
      volunteer_location,
      is_centre_operational,
      non_operational_due_to,
    } = volunteerInfo;

    let center_details = {
      ...store.currentSurveyData.center_details,
      center_contact,
      center_head,
      parent_org,
      type_of_center,
      volunteer_location,
      is_centre_operational,
      non_operational_due_to,
    };
    let payload = {
      ...store.currentSurveyData,
      center_details,
      isSaved: false,
      release_date: '',
      updatedAt: new Date().toString(),
    };

    let tmp = FindAndUpdate(totalSurveys, payload);
    console.log('pg2', payload);
    console.log('TMP', tmp);
    dispatch({
      type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
      payload: payload,
    });
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp});
    navigate(ROUTES.AUTH.CENTREQUESTIONSCREEN);

    let userdata = userStore?.userData?.userData;
    let apiPayload = {
      volunteer_id: userdata?.data?.user?.id,
      state_id: center_details?.state_id,
      district_id: center_details?.district_id,
      address: center_details?.address,
      type: center_details?.type_of_center?.value,
      head_name: center_details?.center_head,
      contact_details: center_contact,
      is_operational: isCenterOperational ? 1 : 0,
      reason_not_operational:
        center_details?.non_operational_due_to?.reason ||
        center_details?.non_operational_due_to?.value ||
        '',
      survey_device_location: center_details?.volunteer_location,
      partially_filled: 1,
      survey_form_id: center_details?.survey_form_id,
      town: center_details?.district_jila,
    };
    console.log(center_details);
    console.log('apiPayload', apiPayload);
  }

  const createCentreSurvey = data => {
    console.log('api payload', data);
  };

  return (
    <View style={styles.container}>
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View style={{flex: 0.2}}>
        <Header title={t('CENTER_DETAILS')} onPressBack={goBack} />
      </View>
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 20,
            marginVertical: 10,
            // borderWidth: 1,
            // borderColor: COLORS.orange,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextHandler
              style={{
                color: 'black',
                // fontWeight: '600',
                fontSize: 18,
                textAlign: 'left',
              }}>
              {t('IS_CENTER_OPERATIONAL')}
            </TextHandler>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setCenterOperational(false);
              setvolunteerInfo({
                ...volunteerInfo,
                is_centre_operational: false,
              });
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderColor: COLORS.blue,
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <RadioButton
              value={t('NO')}
              status={
                !volunteerInfo.is_centre_operational ? 'checked' : 'unchecked'
              }
              uncheckedColor={COLORS.lightGrey}
              onPress={() => {
                setCenterOperational(false);
                setvolunteerInfo({
                  ...volunteerInfo,
                  is_centre_operational: false,
                });
              }}
            />
            <TextHandler style={styles.headingInput}>{t('NO')}</TextHandler>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setCenterOperational(true);
              setvolunteerInfo({
                ...volunteerInfo,
                is_centre_operational: true,
              });
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderColor: COLORS.blue,
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <RadioButton
              value={t('YES')}
              status={
                volunteerInfo.is_centre_operational ? 'checked' : 'unchecked'
              }
              uncheckedColor={COLORS.lightGrey}
              onPress={() => {
                setCenterOperational(true);
                setvolunteerInfo({
                  ...volunteerInfo,
                  is_centre_operational: true,
                });
              }}
            />
            <TextHandler style={styles.headingInput}>{t('YES')}</TextHandler>
          </TouchableOpacity>
        </View>
        {isCenterOperational ? (
          <View style={styles.activeCenter}>
            {/* <View style={{paddingVertical: 5}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '600',
                    marginTop: 8,
                    fontSize: 18,
                    margin: 6,
                  }}>
                  {t('CENTER_TYPE')}
                </Text>
              </View>

              <RadioButtons
                data={miscControllers.CENTRES}
                valueProp={volunteerInfo.type_of_center}
                onValueChange={item => {
                  setvolunteerInfo({...volunteerInfo, type_of_center: item});
                }}
              />
            </View> */}
            <View style={{paddingVertical: 5}}>
              <Text style={styles.headingInput}>{t('CENTER_HEAD_NAME')}</Text>
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="center_head"
                empty={!volunteerInfo.center_head}
                onChangeText={text =>
                  setvolunteerInfo({...volunteerInfo, center_head: text})
                }
                value={volunteerInfo.center_head}
                message={'error'}
                containerStyle={{alignItems: 'center'}}
              />
            </View>
            <View style={{paddingVertical: 5}}>
              <Text style={styles.headingInput}>
                {t('CENTER_CONTACT_DETAILS')}
              </Text>
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="center_contact"
                type={'numeric'}
                number={10}
                empty={!volunteerInfo.center_contact}
                onChangeText={text =>
                  setvolunteerInfo({...volunteerInfo, center_contact: text})
                }
                value={volunteerInfo.center_contact}
                message={'error'}
                containerStyle={{alignItems: 'center'}}
              />
            </View>

            {volunteerInfo.volunteer_location?.lat ? (
              <TouchableOpacity
                onPress={() => {
                  Alert.alert(`${t('LOCATION')}?`, '', [
                    {
                      text: t('YES'),
                      onPress: () => {
                        getLocationPermission();
                      },
                    },
                    {
                      text: t('NO'),
                      onPress: () => {},
                      style: 'cancel',
                    },
                  ]);
                }}
                style={{
                  marginVertical: 10,
                  justifyContent: 'center',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <ADIcons name="checkcircleo" color={'green'} size={25} />
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={styles.headingInput}>
                      {t('LOCATION_SHARED')}
                    </Text>
                    {/* <Text style={{color: COLORS.lightGrey, fontSize: 15}}>
                      ({t('TAP_TO_UPDATE')})
                    </Text> */}
                    <EnIcons
                      name="location-pin"
                      size={25}
                      color={COLORS.blue}
                    />
                  </View>
                </View>
                {locationPermissionError && (
                  <TextHandler style={{color: COLORS.lightGrey}}>
                    {t('LOCATION_PERMISSION_DENIED')}
                  </TextHandler>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={requestLocationPermission}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                }}>
                <Image
                  source={require('../../assets/images/Crosshair.png')}
                  style={{
                    height: 25,
                    width: 25,
                  }}
                />
                <Text style={[styles.headingInput, {color: COLORS.red}]}>
                  {t('LOCATION')}
                </Text>
              </TouchableOpacity>
            )}

            <View style={{paddingVertical: 5}}>
              <Text style={styles.headingInput}>
                {t('PARENT_ORGANIZATION')}
              </Text>
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                empty={!volunteerInfo.parent_org}
                name="first_name"
                onChangeText={text =>
                  setvolunteerInfo({...volunteerInfo, parent_org: text})
                }
                value={volunteerInfo.parent_org}
                message={'error'}
                containerStyle={{alignItems: 'center'}}
              />
            </View>

            <Button
              title={t('NEXT')}
              onPress={() => {
                PageValidator();
              }}
              ButtonContainerStyle={{
                marginVertical: 17,
                alignItems: 'center',
                textAlign: 'center',
              }}
            />
          </View>
        ) : (
          <View style={styles.inActiveCenter}>
            <View>
              <View
                style={{
                  height: 20,
                  width: 20,
                  borderRadius: 40,
                  justifyContent: 'flex-start',
                  marginRight: 5,
                }}>
                <TextHandler
                  style={{
                    color: 'black',
                    textAlign: 'center',
                  }}></TextHandler>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  marginBottom: 20,
                }}>
                <TextHandler
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: '500',
                    // textAlign: 'left',
                  }}>
                  {t('WHY_IS_CENTER_NON_OPERATIONAL')}
                </TextHandler>
              </View>
            </View>

            <View>
              <RadioButtons
                radioStyle={{
                  borderWidth: 0.7,
                  marginVertical: 5,
                  borderColor: COLORS.orange,
                }}
                data={[
                  {
                    key: 1,
                    value: ' Center work has been completed',
                    label: 'NON_OPEARTIONAL_CENTER_OPT1',
                  },
                  {
                    key: 2,
                    value: 'Resources were not available (Teacher,Place etc)',
                    label: 'NON_OPEARTIONAL_CENTER_OPT2',
                  },
                  {
                    key: 3,
                    value: 'Students were not responding',
                    label: 'NON_OPEARTIONAL_CENTER_OPT3',
                  },
                  {
                    key: 4,
                    value: 'Some problems of the Organization',
                    label: 'NON_OPEARTIONAL_CENTER_OPT4',
                  },
                  {
                    key: 5,
                    value: 'Local Social Problems',
                    label: 'NON_OPEARTIONAL_CENTER_OPT5',
                  },
                  {
                    key: 6,
                    value: 'Others',
                    label: 'NON_OPEARTIONAL_CENTER_OPT6',
                  },
                ]}
                valueProp={volunteerInfo.non_operational_due_to}
                onValueChange={item => {
                  setvolunteerInfo({
                    ...volunteerInfo,
                    non_operational_due_to: item,
                  });
                }}
              />
              {volunteerInfo.non_operational_due_to?.key === 6 && (
                <View style={{paddingVertical: 10}}>
                  <TextHandler
                    style={{
                      color: 'black',
                      // fontWeight: '600',
                      // fontSize: 20,
                      textAlign: 'left',
                    }}>
                    {t('TEACHER_Q12_OPT3')}
                  </TextHandler>
                  <Input
                    placeholder={`${t('ENTER_ANSWER')}`}
                    name="center_head"
                    onChangeText={text =>
                      setvolunteerInfo({
                        ...volunteerInfo,
                        non_operational_due_to: {
                          ...volunteerInfo.non_operational_due_to,
                          reason: text,
                        },
                      })
                    }
                    value={volunteerInfo.non_operational_due_to?.reason}
                    message={'error'}
                    containerStyle={{alignItems: 'center'}}
                  />
                </View>
              )}
            </View>

            <Button
              title={t('NEXT')}
              onPress={() => {
                PageValidator();
              }}
              ButtonContainerStyle={{
                marginVertical: 35,
                alignItems: 'center',
                textAlign: 'center',
              }}
            />
          </View>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textBox: {
    flex: 0.45,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    marginTop: 12,
    justifyContent: 'flex-start',
  },

  headingInput: {
    color: 'black',
    fontWeight: '600',
    marginTop: 8,
    fontSize: 18,
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
  activeCenter: {
    flex: 1,
  },
  inActiveCenter: {
    flex: 1,
  },
});
