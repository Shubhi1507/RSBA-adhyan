import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
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
import {Snackbar} from 'react-native-paper';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import Geolocation from '@react-native-community/geolocation';
import {getDistance, getPreciseDistance} from 'geolib';
import {FindAndUpdate} from '../../utils/utils';

export default function CenterDetailsTwoScreen() {
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const dispatch = useDispatch();
  const [isCenterOperational, setCenterOperational] = useState(true);
  const [volunteerInfo, setvolunteerInfo] = useState({
    parent_org: '',
    type_of_center: '',
    center_head: '',
    center_contact: '',
  });
  const [Position, setPosition] = useState();
  const [miscControllers] = useState({
    CENTRES: [
      {
        key: 'Balsankar Kendra',
        value: 'Balsankar Kendra',
      },
      {
        key: 'Abyasika',
        value: 'Abyasika',
      },
      {
        key: 'Pathdaan Centre',
        value: 'Pathdaan Centre',
      },
      {
        key: 'Bal Gokuldham',
        value: 'Bal Gokuldham',
      },
      {
        key: 'Balwadi',
        value: 'Balwadi',
      },
    ],
  });

  let [answers, setAnswers] = useState({
    answer1: '',
  });
  let [error, setError] = useState({visible: false, message: ''});

  useEffect(() => {
    // console.log('store', store);
  }, [store]);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setPosition(JSON.stringify(pos));
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      {enableHighAccuracy: true},
    );
  };

  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      {latitude: 29.210421, longitude: 78.96183},
      {latitude: 29.210421, longitude: 78.96183},
    );
    alert(`Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`);
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
    const {center_contact, center_head, parent_org, type_of_center} =
      volunteerInfo;

    // if (!type_of_center) {
    //   return setError({visible: true, message: 'Select Center type'});
    // }
    // if (!center_head) {
    //   return setError({visible: true, message: 'Center head is missing'});
    // }
    // if (!center_contact || center_contact.length < 10) {
    //   return setError({
    //     visible: true,
    //     message: 'Please enter mobile number',
    //   });
    // }
    // if (!parent_org) {
    //   return setError({
    //     visible: true,
    //     message: 'Parent organisation is missing',
    //   });
    // }
    let center_details = {
      ...store.currentSurveyData.center_details,
      center_contact,
      center_head,
      parent_org,
      type_of_center,
    };
    let payload = {
      ...store.currentSurveyData,
      center_details,
      updatedAt: new Date().toString(),
    };

    let tmp = FindAndUpdate(totalSurveys, payload);

    console.log('pg2', payload);

    dispatch({
      type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
      payload: payload,
    });
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp});
    navigate(ROUTES.AUTH.CENTREQUESTIONSCREEN);
  }

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
          <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 20}}>
            Center Details
          </Text>
        </View>
      </View>
    );
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
        <Header children={HeaderContent()} />
      </View>
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 20,
            marginVertical: 10,
            borderWidth: 1,
            borderColor: COLORS.orange,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TextHandler
              style={{
                color: 'black',
                // fontWeight: '600',
                fontSize: 20,
                textAlign: 'left',
              }}>
              Is center opertional?
            </TextHandler>
          </View>

          <View
            style={{
              flex: 0.6,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TextHandler
              style={{
                color: 'black',
                fontSize: 15,
                textAlign: 'left',
              }}>
              No
            </TextHandler>
            <CustomSwitch
              isSwitchOn={isCenterOperational}
              setIsSwitchOn={() => setCenterOperational(!isCenterOperational)}
            />
            <TextHandler
              style={{
                color: 'black',
                fontSize: 15,
                textAlign: 'right',
              }}>
              Yes
            </TextHandler>
          </View>
        </View>
        {isCenterOperational ? (
          <View style={styles.activeCenter}>
            <View style={{paddingVertical: 5}}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '600',
                  marginTop: 8,
                  fontSize: 20,
                  margin: 6,
                }}>
                {STRINGS.LOGIN.TYPE_OF_CENTER}
              </Text>
              <RadioButtons
                data={miscControllers.CENTRES}
                onValueChange={item => {
                  setvolunteerInfo({...volunteerInfo, type_of_center: item});
                }}
              />
            </View>
            <View style={{paddingVertical: 5}}>
              <Text style={styles.headingInput}>
                {STRINGS.LOGIN.CENTER_HD_NAME}
              </Text>
              <Input
                placeholder="Enter here"
                name="center_head"
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
                {STRINGS.LOGIN.CENTER_CONTACT_DETAILS}
              </Text>
              <Input
                placeholder="Enter here"
                name="center_contact"
                type={'numeric'}
                number={10}
                onChangeText={text =>
                  setvolunteerInfo({...volunteerInfo, center_contact: text})
                }
                value={volunteerInfo.center_contact}
                message={'error'}
                containerStyle={{alignItems: 'center'}}
              />
            </View>
            {/* 
            <TouchableOpacity onPress={calculateDistance}>
              <Text style={{color: 'blue'}}>Calculate Distance</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={calculatePreciseDistance}>
              <Text style={{color: 'blue'}}>Calculate Precise Distance</Text>
            </TouchableOpacity> */}

            <View style={{paddingVertical: 5}}>
              <Text style={styles.headingInput}>
                {STRINGS.LOGIN.PARENT_ORG}
              </Text>
              <Input
                placeholder="Enter here"
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
              title={'Get my location'}
              onPress={() => {
                calculatePreciseDistance();
              }}
              ButtonContainerStyle={{
                marginVertical: 17,
                alignItems: 'center',
                textAlign: 'center',
              }}
            />
            <Button
              title={'Next'}
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
                }}>
                <TextHandler
                  style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: '500',
                    // textAlign: 'left',
                  }}>
                  {'Why is center non operational?'}
                </TextHandler>
              </View>
            </View>

            <View>
              <RadioButtons
                radioStyle={{
                  borderWidth: 1,
                  marginVertical: 2,
                  borderColor: COLORS.orange,
                }}
                data={[
                  {key: 1, value: ' Center work has been completed'},
                  {
                    key: 2,
                    value: 'Resources were not available (Teacher,Place etc)',
                  },
                  {key: 3, value: 'Students were not responding'},
                  {key: 4, value: 'Some problems of the Organization'},
                  {key: 5, value: 'Local Social Problems'},
                  {key: 6, value: 'Others'},
                ]}
                onValueChange={item => {
                  setAnswers({...answers, answer1: item});
                }}
              />
            </View>

            <Button
              title={'Submit'}
              onPress={() => {
                navigate(ROUTES.AUTH.DASHBOARDSCREEN);
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
  activeCenter: {
    flex: 1,
  },
  inActiveCenter: {
    flex: 1,
  },
});
