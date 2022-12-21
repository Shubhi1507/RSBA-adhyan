import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {screenWidth} from '../../libs';
import {
  Button,
  CustomSnackBar,
  CustomSwitch,
  DropDown,
  Header,
  Input,
  TextHandler,
} from '../../components/index';
import {COLORS} from '../../utils/colors';
import {goBack, navigate} from '../../navigation/NavigationService';
import {useState} from 'react';
import {ROUTES} from '../../navigation/RouteConstants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getListofColonies,
  getListofDistricts,
  getListofStates,
} from '../../networking/API.controller';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import LoaderIndicator from '../../components/Loader';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import {FindAndUpdate, isSurveyExists} from '../../utils/utils';
import LocalizationContext from '../../context/LanguageContext';

export default function CenterDetailsOneScreen({navigation, route}) {
  const store = useSelector(state => state);
  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  const [dataLoading, setDataLoading] = useState(false);
  const [error, setError] = useState({visible: false, message: ''});
  let [isSurveyContinuedFlag, setisSurveyContinuedFlag] = useState(false);
  let totalSurveys = store.surveyReducer.totalSurveys;
  let CENTRES_STATUS_FOR_ANEW_SURVEY = [
    {
      key: 1,
      value: `Student's Parents (Current Students)`,
      label: 'STUDENTS_PARENTS_CURRENT_STUDENTS',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 13,
    },
    {
      key: 2,
      value: `Student's Parents (Past Students)`,
      label: 'STUDENTS_PARENTS_PAST_STUDENTS',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 11,
    },
    {
      key: 3,
      value: 'Current Student',
      label: 'CURRENT_STUDENT',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 19,
    },
    {
      key: 4,
      value: 'Past Student',
      label: 'PAST_STUDENT',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 16,
    },
    {
      key: 5,
      value: 'Teacher',
      label: 'TEACHER',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 11,
    },
    {
      key: 6,
      value: 'Kendra Sanchalak',
      label: 'KENDRA_SANCHALAK',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 10,
    },
    {
      key: 7,
      value: 'Basti',
      label: 'BASTI',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 5,
    },
    {
      key: 8,
      value: 'Influential Persons from the Basti',
      label: 'PRABUDDHA_JAN',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 4,
    },
  ];
  const [volunteerInfo, setvolunteerInfo] = useState({
    state_pranth: '',
    state_name: '',
    center_contact: '',
    center_head: '',
    discontinued_due_to: '',
    parent_org: '',
    regularity: '',
    type_of_center: '',
    volunteer_location: {},
    centre_id: '', //  survey_form_id
    survey_form_id: '',
    address: '',
    is_address_changed: false,
    current_address: '',
    sanstha_name: '',
    district_id: '',
    district_jila: '',
    sewakarya_type: '',
    state_id: '',
    // centre qa acc. to documentation https://docs.google.com/spreadsheets/d/19Aq1V-Lz5b42i3BR37FhYKxSIC3p1MYR/edit#gid=2138728367
    establishment: '',
    centre_commence_motive: [],
    kendra_samiti_work: [],
    students_passed_out_from_centre: '',
    centre_not_operational_aftermath: '',
    center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time:
      '',
    discontinuation_time_period: '',
    type_of_basti: '',
    infrastructure: '',
    project_init_before: '',
    pictures_of_bharatmata_and_indian_legends: '',
    sewa_sanstha_running_the_center: '',
    visitors_details_captured: '',
    availability_of_infrastructure: '',
    participation_of_the_basti_people: '',
    is_participation_of_basti_satisfactory: '',
    divyang_and_single_parent_students_enrolled: '',
    basti_toli_active: '',
    oppose_of_the_kendras_activities_by_basti: '',
    members_of_basti_toli_reside_in_same_area: '',
    role_of_our_kendra_in_our_basti_during__corona: '',
    kendra_effect_on_anti_social_problems: '',
    majorprevelant_problems_in_the_basti: [],
    total_population_of_the_basti: '',
    total_population_of_sewa_bharti_beneficiaries: '',
    is_centre_operational: true,
  });
  const [miscControllers, setMiscControllers] = useState({
    state_pranth: false,
    district_jila: false,
    town_basti: false,
    pranthArr: [],
    jilArr: [],
    bastiArr: [],
    cityArr: [],
  });

  useEffect(() => {
    if (route && route?.params && route.params?.centre) {
      console.log(route.params?.centre.survey_form_id);
      setvolunteerInfo({
        ...volunteerInfo,
        address: route.params.centre?.address,
        centre_id: route.params.centre?.survey_form_id,
        survey_form_id: route.params.centre?.survey_form_id,
        district_id: route.params.centre?.district_id,
        sanstha_name: route.params.centre?.sanstha_name,
        sewakarya_type: route.params.centre?.sewakarya_type,
        state_id: route.params.centre?.state_id,
        state_pranth: route.params.centre?.state_name,
        district_jila: route.params.centre?.district_name,
      });
    }
    CheckSurveyviaParams();
  }, []);

  const CheckSurveyviaParams = () => {
    if (
      store &&
      store?.surveyReducer &&
      store?.surveyReducer?.currentSurveyData &&
      Object.keys(store?.surveyReducer?.currentSurveyData).length > 0
    ) {
      let flag = isSurveyExists(
        totalSurveys,
        store?.surveyReducer?.currentSurveyData,
      ).val;
      let staledata = store?.surveyReducer?.currentSurveyData;
      setisSurveyContinuedFlag(flag);
      setvolunteerInfo(staledata.center_details);
    }
  };

  const pageValidator = () => {
    let payload = {};
    let tmp = [...totalSurveys];

    if (isSurveyContinuedFlag) {
      let staledata = isSurveyExists(
        totalSurveys,
        store?.surveyReducer?.currentSurveyData,
      ).payload;
      payload = {
        ...store?.surveyReducer?.currentSurveyData,
        updatedAt: new Date().toString(),
      };
      tmp = FindAndUpdate(tmp, payload);
    } else {
      payload = {
        centre_id: volunteerInfo.centre_id,
        center_details: {
          ...volunteerInfo,
        },
        isCompleted: false,
        isSaved: false,
        createdAt: new Date().toString(),
        updatedAt: new Date().toString(),
        currentSurveyStatus: CENTRES_STATUS_FOR_ANEW_SURVEY,
      };
      tmp.push(payload);
      payload = {...payload, totalSurveys: tmp};
    }

    console.log('new payload', payload);
    dispatch({
      type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
      payload: payload,
    });
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp});
    navigate(ROUTES.AUTH.VOLUNTEERPARENTALORGSCREEN);
  };

  const getListofStatesFunction = async () => {
    setDataLoading(true);
    const data = await getListofStates();
    if (data && data.data && Array.isArray(data.data)) {
      let temp = data.data;
      let states = [];
      temp.forEach(el => {
        states.push({key: el.id, value: el.name});
      });
      dispatch({
        type: ACTION_CONSTANTS.UPDATE_STATE_LIST,
        payload: states,
      });
    } else {
      dispatch({type: ACTION_CONSTANTS.CLEAR_STATE_LIST});
    }
    setDataLoading(false);
  };

  const getListOfDistrictsfunc = async id => {
    setDataLoading(true);
    const data = await getListofDistricts(id);
    if (data && data.data && Array.isArray(data.data)) {
      let temp = data.data;
      let districts = [];
      temp.forEach(el => {
        districts.push({key: el.id, value: el.name});
      });
      dispatch({
        type: ACTION_CONSTANTS.UPDATE_DISTRICTS_LIST,
        payload: districts,
      });
    } else {
      dispatch({type: ACTION_CONSTANTS.CLEAR_DISTRICTS_LIST});
    }
    setDataLoading(false);
  };

  const getColoniesBasedUponDistrictID = async id => {
    setDataLoading(true);
    try {
      const data = await getListofColonies(id);

      if (data && data.data && Array.isArray(data.data)) {
        let temp = data.data;
        let towns = [];
        temp.forEach(el => {
          towns.push({key: el.id, value: el.name});
        });
        console.log('towns', temp);
        dispatch({
          type: ACTION_CONSTANTS.UPDATE_BASTI_LIST,
          payload: towns,
        });
      } else {
        dispatch({
          type: ACTION_CONSTANTS.CLEAR_BASTI_LIST,
        });
      }
      setDataLoading(false);
    } catch (error) {
      console.log(error);
      setDataLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LoaderIndicator loading={dataLoading} />
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View style={{flex: 0.2}}>
        <Header
          title={t('CENTER_DETAILS')}
          onPressBack={() => {
            goBack();
            dispatch({type: ACTION_CONSTANTS.CLEAR_CURRENT_SURVEY});
          }}
        />
      </View>

      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <TextHandler
          style={{
            color: 'black',
            fontWeight: '600',
            marginTop: 20,
            fontSize: 20,
            textAlign: 'left',
          }}></TextHandler>
        <View>
          <Text style={styles.headingInput}>{t('PRANTH')}</Text>
          {/* states */}
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, state_pranth: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, state_pranth: false});
            }}
            isFocused={miscControllers.state_pranth}
            isVisible={miscControllers.state_pranth}
            title={''}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, state_pranth: item.value});
              getListOfDistrictsfunc(item.key);
            }}
            optionsArr={store?.RegionReducer?.stateList || []}
            error={'Pranth'}
            value={
              volunteerInfo.state_pranth
                ? volunteerInfo.state_pranth.toString()
                : volunteerInfo.state_id.toString()
            }
          />
        </View>
        <View>
          <Text style={styles.headingInput}>{t('DISTRICT')}</Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, district_jila: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, district_jila: false});
            }}
            isFocused={miscControllers.district_jila}
            isVisible={miscControllers.district_jila}
            title={''}
            onSelect={item => {
              setvolunteerInfo({
                ...volunteerInfo,
                district_jila: item.value,
                centre_id: '',
              });
              getColoniesBasedUponDistrictID(item.key);
            }}
            optionsArr={store?.RegionReducer?.districtList || []}
            error={'Jila'}
            value={
              volunteerInfo.district_jila
                ? volunteerInfo.district_jila.toString()
                : volunteerInfo.district_id.toString()
            }
          />
        </View>
        <View>
          <Text style={styles.headingInput}>{t('CENTRE')} </Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, town_basti: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, town_basti: false});
            }}
            isFocused={miscControllers.town_basti}
            isVisible={miscControllers.town_basti}
            title={''}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, centre_id: item.value});
            }}
            optionsArr={store?.RegionReducer?.bastiList || []}
            error={'City'}
            value={volunteerInfo.centre_id}
          />
        </View>

        <View>
          <Text style={styles.headingInput}>{t('ADDRESS')} </Text>
          <Input
            placeholder={`${t('ENTER_ANSWER')}`}
            name="address"
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, address: text})
            }
            disabled={true}
            multi={true}
            value={volunteerInfo.address}
            empty={!volunteerInfo.address}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>

        {/* changed address switch */}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 20,
            marginVertical: 10,
            borderRadius: 5,
            paddingHorizontal: 10,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <TextHandler
              style={[
                styles.headingInput,
                {
                  textAlign: 'left',
                },
              ]}>
              {t('IS_ADDRESS_CHANGED')}
            </TextHandler>
          </View>

          <View
            style={{
              flex: 0.6,
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <TextHandler style={styles.headingInput}>{t('NO')}</TextHandler>
            <CustomSwitch
              isSwitchOn={volunteerInfo.is_address_changed}
              setIsSwitchOn={() => {
                console.log(volunteerInfo.is_address_changed);
                setvolunteerInfo({
                  ...volunteerInfo,
                  is_address_changed: !volunteerInfo.is_address_changed,
                });
              }}
            />
            <TextHandler style={styles.headingInput}>{t('YES')}</TextHandler>
          </View>
        </View>

        {volunteerInfo.is_address_changed && (
          <View>
            <Text style={styles.headingInput}>{t('CURRENT_ADDRESS')} </Text>
            <Input
              placeholder={`${t('CURRENT_ADDRESS')}`}
              name="address"
              onChangeText={text =>
                setvolunteerInfo({...volunteerInfo, current_address: text})
              }
              multi={true}
              value={volunteerInfo.current_address}
              empty={!volunteerInfo.current_address}
              message={'error'}
              containerStyle={{alignItems: 'center'}}
            />
          </View>
        )}

        <Button
          title={t('NEXT')}
          onPress={pageValidator}
          ButtonContainerStyle={{
            marginVertical: 20,
            alignItems: 'center',
            textAlign: 'center',
          }}
        />
      </KeyboardAwareScrollView>
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
});
