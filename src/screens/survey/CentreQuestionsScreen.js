import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import {useDispatch, useSelector} from 'react-redux';
import {STRINGS} from '../../constants/strings';
import {COLORS} from '../../utils/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  Button,
  CustomSnackBar,
  Header,
  Input,
  RadioButtons,
  TextHandler,
} from '../../components';
import {useState} from 'react';
import {screenWidth} from '../../libs';
import {ROUTES} from '../../navigation/RouteConstants';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {FindAndUpdate} from '../../utils/utils';
import LocalizationContext from '../../context/LanguageContext';
import {Checkbox} from 'react-native-paper';
import LoaderIndicator from '../../components/Loader';
import {BASE_URL} from '../../networking';

export default function CentreQuestionsScreen() {
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);
  const dispatch = useDispatch();
  let totalSurveys = store.totalSurveys;
  const userStore = useSelector(state => state?.authReducer);

  const [dataLoading, setDataLoading] = useState(false);
  let [answers, setAnswers] = useState({
    establishment: '',
    centre_commence_motive: [],
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
    kendra_samiti_work: [],
    oppose_of_the_kendras_activities_by_basti: '',
    members_of_basti_toli_reside_in_same_area: '',
    role_of_our_kendra_in_our_basti_during__corona: '',
    kendra_effect_on_anti_social_problems: '',

    majorprevelant_problems_in_the_basti: [],
    total_population_of_sewa_bharti_beneficiaries: '',
  });
  const [error, setError] = useState({visible: false, message: ''});

  useEffect(() => {
    CheckSurveyviaParams();
  }, [store]);
  const CheckSurveyviaParams = () => {
    if (
      store &&
      store?.currentSurveyData &&
      Object.keys(store?.currentSurveyData).length > 0
    ) {
      let staledata = store;
      console.log('c3', staledata?.currentSurveyData);
      let tmp = {...staledata?.currentSurveyData?.center_details};
      setAnswers(tmp);
    }
  };

  const pageValidator = async () => {
    setDataLoading(true);
    const {
      establishment,
      infrastructure,
      type_of_basti,
      project_init_before,
      availability_of_infrastructure,
      basti_toli_active,
      center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time,
      centre_commence_motive,
      centre_not_operational_aftermath,
      discontinuation_time_period,
      divyang_and_single_parent_students_enrolled,
      is_participation_of_basti_satisfactory,
      kendra_effect_on_anti_social_problems,
      majorprevelant_problems_in_the_basti,
      members_of_basti_toli_reside_in_same_area,
      oppose_of_the_kendras_activities_by_basti,
      kendra_samiti_work,
      participation_of_the_basti_people,
      pictures_of_bharatmata_and_indian_legends,
      role_of_our_kendra_in_our_basti_during__corona,
      sewa_sanstha_running_the_center,
      students_passed_out_from_centre,
      total_population_of_sewa_bharti_beneficiaries,
      visitors_details_captured,
    } = answers;

    const {center_details} = store.currentSurveyData;

    let new_centre_details = {
      ...center_details,
      establishment,
      infrastructure,
      type_of_basti,
      project_init_before,
      availability_of_infrastructure,
      basti_toli_active,
      center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time,
      centre_commence_motive,
      centre_not_operational_aftermath,
      discontinuation_time_period,
      divyang_and_single_parent_students_enrolled,
      is_participation_of_basti_satisfactory,
      kendra_effect_on_anti_social_problems,
      majorprevelant_problems_in_the_basti,
      members_of_basti_toli_reside_in_same_area,
      oppose_of_the_kendras_activities_by_basti,
      participation_of_the_basti_people,
      pictures_of_bharatmata_and_indian_legends,
      role_of_our_kendra_in_our_basti_during__corona,
      sewa_sanstha_running_the_center,
      students_passed_out_from_centre,
      total_population_of_sewa_bharti_beneficiaries,
      kendra_samiti_work,
      visitors_details_captured,
    };

    let ans1 = !answers.establishment ? 0 : 1;
    let ans2 = answers.centre_commence_motive.length > 0 ? 1 : 0;
    let ans3 = !answers.students_passed_out_from_centre ? 0 : 1;
    let ans4 = !answers.centre_not_operational_aftermath ? 0 : 1;
    let ans5 =
      answers.center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time ||
      (answers
        .center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time
        ?.value === 'Discontinued for some duration' &&
        discontinuation_time_period)
        ? 1
        : 0;
    let ans6 = !answers.type_of_basti ? 0 : 1;
    let ans7 = !answers.project_init_before ? 0 : 1;
    let ans8 = !answers.pictures_of_bharatmata_and_indian_legends ? 0 : 1;
    let ans9 = !answers.sewa_sanstha_running_the_center ? 0 : 1;
    let ans10 = !answers.visitors_details_captured ? 0 : 1;
    let ans11 = !answers.availability_of_infrastructure ? 0 : 1;
    let ans12 = !answers.participation_of_the_basti_people ? 0 : 1;
    let ans13 = !answers.is_participation_of_basti_satisfactory ? 0 : 1;
    let ans14 =
      (answers.divyang_and_single_parent_students_enrolled?.value === 'Yes' &&
        answers.divyang_and_single_parent_students_enrolled?.divyang_count &&
        answers.divyang_and_single_parent_students_enrolled
          ?.no_or_single_parent_count) ||
      answers.divyang_and_single_parent_students_enrolled?.value === 'No'
        ? 1
        : 0;
    let ans15 = !answers.basti_toli_active ? 0 : 1;
    let ans16 =
      (answers.oppose_of_the_kendras_activities_by_basti?.value === 'Yes' &&
        answers.oppose_of_the_kendras_activities_by_basti?.other) ||
      answers.divyang_and_single_parent_students_enrolled?.value === 'No'
        ? 1
        : 0;
    let ans17 =
      (answers.members_of_basti_toli_reside_in_same_area?.value === 'No' &&
        answers.members_of_basti_toli_reside_in_same_area?.other) ||
      answers.members_of_basti_toli_reside_in_same_area?.value === 'Yes'
        ? 1
        : 0;
    let ans18 =
      (answers.role_of_our_kendra_in_our_basti_during__corona?.value == 'Yes' &&
        answers.kendra_samiti_work.length > 0) ||
      answers.role_of_our_kendra_in_our_basti_during__corona?.value == 'No'
        ? 1
        : 0;
    let ans19 = !answers.kendra_effect_on_anti_social_problems ? 0 : 1;
    let ans20 = answers.majorprevelant_problems_in_the_basti.length > 0 ? 1 : 0;
    let ans21 = !answers.total_population_of_sewa_bharti_beneficiaries ? 0 : 1;

    let ansSum =
      ans1 +
      ans2 +
      ans3 +
      ans4 +
      ans5 +
      ans6 +
      ans7 +
      ans8 +
      ans9 +
      ans10 +
      ans11 +
      ans12 +
      ans13 +
      ans14 +
      ans15 +
      ans16 +
      ans17 +
      ans18 +
      ans19 +
      ans20 +
      ans21;

    if (ansSum === 21) {
      setDataLoading(false);
      return setError({
        ...error,
        message: t('PLEASE_ANSWER_ALL_QUE'),
        visible: true,
      });
    } else {
      try {
        // create survey centre api
        let userdata = userStore?.userData?.userData;
        console.log(center_details);
        // let apiPayload = {
        //   volunteer_id: userdata?.data?.user?.id,
        //   state_id: center_details?.state_id,
        //   district_id: center_details?.district_id,
        //   address: center_details?.address,
        //   type: center_details?.type_of_center?.value,
        //   head_name: center_details?.center_head,
        //   contact_details: center_details?.center_contact,
        //   is_operational: center_details?.is_centre_operational ? 1 : 0,
        //   reason_not_operational:
        //     center_details?.non_operational_due_to?.reason ||
        //     center_details?.non_operational_due_to?.value ||
        //     '',
        //   survey_device_location: center_details?.volunteer_location,
        //   partially_filled: 1,
        //   survey_form_id: center_details?.survey_form_id,
        //   town: center_details?.district_jila,
        //   parent_org: center_details?.parent_org,
        // };

        // const formdata = new FormData();
        // formdata.append('volunteer_id', parseInt(apiPayload.volunteer_id));
        // formdata.append('state_id', apiPayload.state_id);
        // formdata.append('address', apiPayload.address);
        // formdata.append('district_id', apiPayload.district_id);
        // formdata.append('type', apiPayload.type);
        // formdata.append('head_name', apiPayload.head_name);
        // formdata.append('contact_details', apiPayload.contact_details);
        // formdata.append('is_operational', apiPayload.is_operational);
        // formdata.append('parent_organization', apiPayload.parent_org);
        // formdata.append(
        //   'reason_not_operational',
        //   apiPayload.reason_not_operational,
        // );
        // formdata.append('survey_device_location', '');
        // formdata.append('partially_filled', '1');
        // formdata.append('survey_form_id', apiPayload.survey_form_id);
        // formdata.append('town', apiPayload.town);
        // formdata.append('establishment_year', establishment);

        // console.log('formdata', formdata);
        // var requestOptions = {
        //   method: 'POST',
        //   body: formdata,
        //   redirect: 'follow',
        // };
        // const response = await fetch(BASE_URL + 'center', requestOptions);
        // console.log('response', await response.json());
        setDataLoading(false);
        let payload = {
          ...store.currentSurveyData,
          center_details: new_centre_details,
          // api_centre_id: response?.data?.id,
          updatedAt: new Date().toString(),
        };
        let tmp = FindAndUpdate(totalSurveys, payload);
        console.log('new payload cqs', payload);
        dispatch({
          type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
          payload: payload,
        });
        dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp});
        navigate(ROUTES.AUTH.SELECTAUDIENCESCREEN);

        // create survey of center api
      } catch (error) {
        console.log(error);
        setDataLoading(false);
      }

      // also call api here
    }
  };

  return (
    <View style={styles.container}>
      <LoaderIndicator loading={dataLoading} />

      <View style={{flex: 0.2}}>
        <Header title={t('CENTER_INFO')} onPressBack={goBack} />
      </View>
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        {/* QA1 - OK - establishment */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.establishment
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.establishment ? COLORS.black : COLORS.white,
                  textAlign: 'center',
                }}>
                {1}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q1')}
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({...answers, establishment: text});
            }}
            empty={!answers.establishment}
            value={answers.establishment}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
            }}
          />
        </View>

        {/* QA2 -OK - centre_commence_motive*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.centre_commence_motive.length > 0
                    ? COLORS.orange
                    : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    answers.centre_commence_motive.length > 0
                      ? COLORS.black
                      : COLORS.white,
                  textAlign: 'center',
                }}>
                {2}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q2')}
              </TextHandler>
            </View>
          </View>

          <View>
            {[
              {
                key: 1,
                value: 'Need for Education',
                label: 'CENTER_Q2_OPT1',
              },
              {
                key: 2,
                value: 'Parents could not spare time for students',
                label: 'CENTER_Q2_OPT2',
              },
              {
                key: 3,
                value: 'No other facility available nearby ',
                label: 'CENTER_Q2_OPT3',
              },
              {
                key: 4,
                value: 'Expansion of our work',
                label: 'CENTER_Q2_OPT4',
              },
              {
                key: 5,
                value: 'On demand from the community',
                label: 'CENTER_Q2_OPT5',
              },
            ].map((el, index) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    marginVertical: 2,
                    borderColor: COLORS.orange,
                    paddingVertical: 5,
                    marginVertical: 5,
                  }}
                  onPress={() => {
                    let tmp = [...answers.centre_commence_motive];

                    if (tmp.length > 0) {
                      let j = tmp.filter(element => element.key === 999);
                      if (j.length > 0) {
                        tmp = [];
                        tmp.push(el);
                        setAnswers({
                          ...answers,
                          centre_commence_motive: tmp,
                        });
                      } else {
                        tmp.forEach(function (item, index1) {
                          if (item.value === el.value) {
                            let tmp = [...answers.centre_commence_motive];
                            tmp.splice(index1, 1);
                            setAnswers({
                              ...answers,
                              centre_commence_motive: tmp,
                            });
                          } else {
                            let tmp = [...answers.centre_commence_motive];
                            tmp.push(el);
                            setAnswers({
                              ...answers,
                              centre_commence_motive: tmp,
                            });
                          }
                        });
                      }
                    } else {
                      tmp.push(el);
                      setAnswers({
                        ...answers,
                        centre_commence_motive: tmp,
                      });
                    }
                  }}>
                  <Checkbox
                    status={
                      answers.centre_commence_motive.filter(
                        item => item.value === el.value,
                      ).length > 0
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={COLORS.blue}
                  />
                  <TextHandler
                    style={{
                      color: 'black',
                      // textAlign: 'left',
                    }}>
                    {t(el.label)}
                  </TextHandler>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* QA3 - OK - students_passed_out_from_centre */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.students_passed_out_from_centre
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    answers.students_passed_out_from_centre.length > 0
                      ? COLORS.black
                      : COLORS.white,
                  textAlign: 'center',
                }}>
                {3}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q3')}
              </TextHandler>
            </View>
          </View>

          <View>
            <Input
              placeholder={`${t('ENTER_ANSWER')}`}
              type={'numeric'}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, students_passed_out_from_centre: text});
              }}
              value={answers.students_passed_out_from_centre}
              empty={!answers.students_passed_out_from_centre}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        {/* QA4 - OK - centre_not_operational_aftermath */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.centre_not_operational_aftermath
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    answers.centre_not_operational_aftermath.length > 0
                      ? COLORS.black
                      : COLORS.white,
                  textAlign: 'center',
                }}>
                {4}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q4')}
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
                {
                  key: 1,
                  value: 'Students will not able to do education',
                  label: 'CENTRE_Q4_OPT1',
                },
                {
                  key: 2,
                  value: 'Crime will increase in the community',
                  label: 'CENTRE_Q4_OPT2',
                },
                {
                  key: 3,
                  value:
                    'No one will be available in the locality to take care of education and sanskar',
                  label: 'CENTRE_Q4_OPT3',
                },
              ]}
              valueProp={answers.centre_not_operational_aftermath}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  centre_not_operational_aftermath: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA5 - OK - center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time
                    ? COLORS.orange
                    : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    answers.center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time
                      ? COLORS.black
                      : COLORS.white,
                  textAlign: 'center',
                }}>
                {5}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q5')}
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
                {
                  key: 1,
                  value: 'Regular Since Inception',
                  label: 'CENTER_Q5_OPT1',
                },
                {
                  key: 2,
                  value: 'Discontinued for some duration',
                  label: 'CENTER_Q5_OPT2',
                },
              ]}
              valueProp={
                answers.center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time:
                    item,
                });
              }}
            />
          </View>
        </View>

        {/* QA5A - OK - discontinuation_time_period item */}
        {answers
          .center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time
          ?.key === 2 && (
          <View>
            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <View
                style={{
                  backgroundColor: answers.discontinuation_time_period
                    ? COLORS.orange
                    : COLORS.red,
                  height: 20,
                  width: 20,
                  borderRadius: 40,
                  justifyContent: 'flex-start',
                  marginRight: 5,
                }}>
                <TextHandler
                  style={{
                    color: answers.discontinuation_time_period
                      ? COLORS.black
                      : COLORS.white,
                    textAlign: 'center',
                  }}>
                  {'5a'}
                </TextHandler>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                }}>
                <TextHandler style={styles.question}>
                  {t('CENTER_Q6_DISCONTINUED_CENTER')}
                </TextHandler>
              </View>
            </View>

            <RadioButtons
              radioStyle={{
                borderWidth: 1,
                marginVertical: 2,
                borderColor: COLORS.orange,
              }}
              data={[
                // {
                //   key: 1,
                //   value: 'Less than 1 month',
                //   label: 'CENTER_Q6_DISCONTINUED_CENTER_OPT1',
                // },
                {
                  key: 2,
                  value: '1 to 6 months',
                  label: 'CENTER_Q6_DISCONTINUED_CENTER_OPT2',
                },
                {
                  key: 3,
                  value: '6 to 12 months',
                  label: 'CENTER_Q6_DISCONTINUED_CENTER_OPT3',
                },
                {
                  key: 4,
                  value: 'More than 12 months',
                  label: 'CENTER_Q6_DISCONTINUED_CENTER_OPT4',
                },
              ]}
              valueProp={answers.discontinuation_time_period}
              onValueChange={item => {
                setAnswers({...answers, discontinuation_time_period: item});
              }}
            />
          </View>
        )}

        {/* QA6 - OK - type_of_basti*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.type_of_basti
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.type_of_basti ? COLORS.black : COLORS.white,
                  textAlign: 'center',
                }}>
                {6}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q7')}
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
                {key: 1, value: 'Ordinary basti', label: 'CENTER_Q7_OPT1'},
                {key: 2, value: 'Sewa basti', label: 'CENTER_Q7_OPT2'},
                {key: 3, value: 'Village', label: 'CENTER_Q7_OPT3'},
              ]}
              valueProp={answers.type_of_basti}
              onValueChange={item => {
                setAnswers({...answers, type_of_basti: item});
              }}
            />
          </View>
        </View>

        {/* QA7 - OK - project_init_before*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.project_init_before
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.project_init_before
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {7}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q8')}
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
                {
                  key: 1,
                  value: 'Community Hall',
                  label: 'CENTER_Q8_OPT1',
                },
                {
                  key: 2,
                  value: 'Classroom (rented or owned)",',
                  label: 'CENTER_Q8_OPT2',
                },
                {
                  key: 3,
                  value: 'Open Air',
                  label: 'CENTER_Q8_OPT3',
                },
              ]}
              valueProp={answers.project_init_before}
              onValueChange={item => {
                setAnswers({...answers, project_init_before: item});
              }}
            />
          </View>
        </View>

        {/* QA8 - OK - pictures_of_bharatmata_and_indian_legends */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.pictures_of_bharatmata_and_indian_legends
                    ? COLORS.orange
                    : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.pictures_of_bharatmata_and_indian_legends
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {8}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q10')}
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
                {
                  key: 1,
                  value: 'Yes',
                  label: 'YES',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.pictures_of_bharatmata_and_indian_legends}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  pictures_of_bharatmata_and_indian_legends: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA9 - OK - sewa_sanstha_running_the_center */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.sewa_sanstha_running_the_center
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.sewa_sanstha_running_the_center
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {9}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q11')}
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
                {
                  key: 1,
                  value: 'Yes',
                  label: 'YES',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.sewa_sanstha_running_the_center}
              onValueChange={item => {
                setAnswers({...answers, sewa_sanstha_running_the_center: item});
              }}
            />
          </View>
        </View>
        {/* QA10 - OK - visitors_details_captured */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.visitors_details_captured
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.visitors_details_captured
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {10}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q12')}
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
                {
                  key: 1,
                  value: 'Yes',
                  label: 'YES',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.visitors_details_captured}
              onValueChange={item => {
                setAnswers({...answers, visitors_details_captured: item});
              }}
            />
          </View>
        </View>

        {/* QA11 - OK - availability_of_infrastructure */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.availability_of_infrastructure
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.availability_of_infrastructure
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {11}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q13')}
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
                {
                  key: 1,
                  value: 'Sufficient',
                  label: 'CENTER_Q13_OPT1',
                },
                {
                  key: 2,
                  value: 'Insufficient',
                  label: 'CENTER_Q13_OPT2',
                },
              ]}
              valueProp={answers.availability_of_infrastructure}
              onValueChange={item => {
                setAnswers({...answers, availability_of_infrastructure: item});
              }}
            />
          </View>
        </View>

        {/* QA12 - OK - participation_of_the_basti_people */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.participation_of_the_basti_people
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.participation_of_the_basti_people
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {12}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q14')}
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
                {
                  key: 1,
                  value: 'only attendence',
                  label: 'CENTER_Q14_OPT1',
                },
                {
                  key: 2,
                  value: 'Average participation',
                  label: 'CENTER_Q14_OPT2',
                },
                {
                  key: 2,
                  value: 'Enthusiastic participation',
                  label: 'CENTER_Q14_OPT3',
                },
                {
                  key: 2,
                  value: 'No such programs are organised',
                  label: 'CENTER_Q14_OPT4',
                },
              ]}
              valueProp={answers.participation_of_the_basti_people}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  participation_of_the_basti_people: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA13 - OK - is_participation_of_basti_satisfactory */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.is_participation_of_basti_satisfactory
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.is_participation_of_basti_satisfactory
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {13}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q15')}
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
                {
                  key: 1,
                  value: 'Yes',
                  label: 'YES',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.is_participation_of_basti_satisfactory}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  is_participation_of_basti_satisfactory: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA14 - OK - divyang_and_single_parent_students_enrolled  */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  (answers.divyang_and_single_parent_students_enrolled
                    ?.value === 'Yes' &&
                    answers.divyang_and_single_parent_students_enrolled
                      ?.divyang_count &&
                    answers.divyang_and_single_parent_students_enrolled
                      ?.no_or_single_parent_count) ||
                  answers.divyang_and_single_parent_students_enrolled?.value ===
                    'No'
                    ? COLORS.orange
                    : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    (answers.divyang_and_single_parent_students_enrolled
                      ?.value === 'Yes' &&
                      answers.divyang_and_single_parent_students_enrolled
                        ?.divyang_count &&
                      answers.divyang_and_single_parent_students_enrolled
                        ?.no_or_single_parent_count) ||
                    answers.divyang_and_single_parent_students_enrolled
                      ?.value === 'No'
                      ? COLORS.black
                      : COLORS.white,
                  textAlign: 'center',
                }}>
                {14}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q17')}
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
                {
                  key: 1,
                  value: 'Yes',
                  label: 'CENTER_Q17_OPT1',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.divyang_and_single_parent_students_enrolled}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  divyang_and_single_parent_students_enrolled: item,
                });
              }}
            />
            {answers.divyang_and_single_parent_students_enrolled?.key == 1 && (
              <View>
                <TextHandler
                  style={{
                    color: 'black',
                  }}>
                  {t('DIVYANG')}
                </TextHandler>
                <Input
                  type={'numeric'}
                  number={4}
                  placeholder={`${t('ENTER_ANSWER')}`}
                  name="any"
                  onChangeText={text => {
                    setAnswers({
                      ...answers,
                      divyang_and_single_parent_students_enrolled: {
                        ...answers.divyang_and_single_parent_students_enrolled,
                        divyang_count: text,
                      },
                    });
                  }}
                  value={
                    answers.divyang_and_single_parent_students_enrolled
                      ?.divyang_count
                  }
                  empty={
                    !answers.divyang_and_single_parent_students_enrolled
                      ?.divyang_count
                  }
                  message={''}
                  containerStyle={{
                    alignItems: 'center',
                    minWidth: screenWidth * 0.5,
                  }}
                />
                <TextHandler
                  style={{
                    color: 'black',
                  }}>
                  {t('SINGLE_OR_NO_PARENT')}
                </TextHandler>
                <Input
                  type={'numeric'}
                  number={4}
                  placeholder={`${t('ENTER_ANSWER')}`}
                  name="any"
                  onChangeText={text => {
                    setAnswers({
                      ...answers,
                      divyang_and_single_parent_students_enrolled: {
                        ...answers.divyang_and_single_parent_students_enrolled,
                        no_or_single_parent_count: text,
                      },
                    });
                  }}
                  value={
                    answers.divyang_and_single_parent_students_enrolled
                      ?.no_or_single_parent_count
                  }
                  empty={
                    !answers.divyang_and_single_parent_students_enrolled
                      ?.no_or_single_parent_count
                  }
                  message={''}
                  containerStyle={{
                    alignItems: 'center',
                    minWidth: screenWidth * 0.5,
                  }}
                />
              </View>
            )}
          </View>
        </View>

        {/* QA15 - OK - basti_toli_active */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.basti_toli_active
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.basti_toli_active
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {15}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q18')}
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
                {
                  key: 1,
                  value: 'Yes',
                  label: 'YES',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.basti_toli_active}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  basti_toli_active: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA16 - OK - oppose_of_the_kendras_activities_by_basti  */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  (answers.oppose_of_the_kendras_activities_by_basti?.value ===
                    'Yes' &&
                    answers.oppose_of_the_kendras_activities_by_basti?.other) ||
                  answers.divyang_and_single_parent_students_enrolled?.value ===
                    'No'
                    ? COLORS.orange
                    : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    (answers.oppose_of_the_kendras_activities_by_basti
                      ?.value === 'Yes' &&
                      answers.oppose_of_the_kendras_activities_by_basti
                        ?.other) ||
                    answers.divyang_and_single_parent_students_enrolled
                      ?.value === 'No'
                      ? COLORS.black
                      : COLORS.white,
                  textAlign: 'center',
                }}>
                {16}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q16')}
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
                {
                  key: 1,
                  value: 'Yes',
                  label: 'CENTER_Q16_OPT1',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.oppose_of_the_kendras_activities_by_basti}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  oppose_of_the_kendras_activities_by_basti: item,
                });
              }}
            />
            {answers.oppose_of_the_kendras_activities_by_basti?.key == 1 && (
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    oppose_of_the_kendras_activities_by_basti: {
                      ...answers.oppose_of_the_kendras_activities_by_basti,
                      other: text,
                    },
                  });
                }}
                value={answers.oppose_of_the_kendras_activities_by_basti?.other}
                empty={
                  !answers.oppose_of_the_kendras_activities_by_basti?.other
                }
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA17 - OK - members_of_basti_toli_reside_in_same_area   */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  (answers.members_of_basti_toli_reside_in_same_area?.value ===
                    'No' &&
                    answers.members_of_basti_toli_reside_in_same_area?.other) ||
                  answers.members_of_basti_toli_reside_in_same_area?.value ===
                    'Yes'
                    ? COLORS.orange
                    : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    (answers.members_of_basti_toli_reside_in_same_area
                      ?.value === 'No' &&
                      answers.members_of_basti_toli_reside_in_same_area
                        ?.other) ||
                    answers.members_of_basti_toli_reside_in_same_area?.value ===
                      'Yes'
                      ? COLORS.black
                      : COLORS.white,
                  textAlign: 'center',
                }}>
                {17}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q19')}
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
                {
                  key: 1,
                  value: 'Yes',
                  label: 'YES',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'CENTER_Q19_OPT1',
                },
              ]}
              valueProp={answers.members_of_basti_toli_reside_in_same_area}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  members_of_basti_toli_reside_in_same_area: item,
                });
              }}
            />
            {answers.members_of_basti_toli_reside_in_same_area?.key == 2 && (
              <View style={{marginTop: 10}}>
                <TextHandler
                  style={{
                    color: 'black',
                  }}>
                  {t('CENTER_Q19_OPT')}
                </TextHandler>
                <Input
                  type={'default'}
                  placeholder={`${t('ENTER_ANSWER')}`}
                  name="any"
                  onChangeText={text => {
                    setAnswers({
                      ...answers,
                      members_of_basti_toli_reside_in_same_area: {
                        ...answers.members_of_basti_toli_reside_in_same_area,
                        other: text,
                      },
                    });
                  }}
                  value={
                    answers.members_of_basti_toli_reside_in_same_area?.other
                  }
                  empty={
                    !answers.members_of_basti_toli_reside_in_same_area?.other
                  }
                  message={''}
                  containerStyle={{
                    alignItems: 'center',
                    minWidth: screenWidth * 0.5,
                  }}
                />
              </View>
            )}
          </View>
        </View>

        {/* QA18 - OK - role_of_our_kendra_in_our_basti_during__corona */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  (answers.role_of_our_kendra_in_our_basti_during__corona
                    ?.value == 'Yes' &&
                    answers.kendra_samiti_work.length > 0) ||
                  answers.role_of_our_kendra_in_our_basti_during__corona
                    ?.value == 'No'
                    ? COLORS.orange
                    : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    (answers.role_of_our_kendra_in_our_basti_during__corona
                      ?.value == 'Yes' &&
                      answers.kendra_samiti_work.length > 0) ||
                    answers.role_of_our_kendra_in_our_basti_during__corona
                      ?.value == 'No'
                      ? COLORS.black
                      : COLORS.white,
                  textAlign: 'center',
                }}>
                {18}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q20')}
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
                {
                  key: 1,
                  value: 'Yes',
                  label: 'CENTER_Q20_OPT1',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.role_of_our_kendra_in_our_basti_during__corona}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  role_of_our_kendra_in_our_basti_during__corona: item,
                });
              }}
            />
          </View>
        </View>

        {/* 18 A  Yes - role_of_our_kendra_in_our_basti_during__corona */}

        {answers.role_of_our_kendra_in_our_basti_during__corona?.key === 1 && (
          <View>
            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <View
                style={{
                  backgroundColor:
                    answers.kendra_samiti_work.length > 0
                      ? COLORS.orange
                      : COLORS.red,
                  height: 20,
                  width: 20,
                  borderRadius: 40,
                  justifyContent: 'flex-start',
                  marginRight: 5,
                }}>
                <TextHandler
                  style={{
                    color:
                      answers.kendra_samiti_work.length > 0
                        ? COLORS.black
                        : COLORS.white,
                    textAlign: 'center',
                  }}>
                  {'a'}
                </TextHandler>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                }}>
                <TextHandler style={styles.question}>
                  {t('CENTER_Q20_DISCONTINUED')}
                </TextHandler>
              </View>
            </View>

            {[
              {
                key: 1,
                value: 'Less than 1 month',
                label: 'CENTER_Q20_DISCONTINUED_OPT1',
              },
              {
                key: 2,
                value: '1 to 6 months',
                label: 'CENTER_Q20_DISCONTINUED_OPT2',
              },
              {
                key: 3,
                value: '6 to 12 months',
                label: 'CENTER_Q20_DISCONTINUED_OPT3',
              },
              {
                key: 4,
                value: 'More than 12 months',
                label: 'CENTER_Q20_DISCONTINUED_OPT4',
              },
              {
                key: 5,
                value: 'Grocery kit distribution',
                label: 'CENTER_Q20_DISCONTINUED_OPT5',
              },
            ].map((el, index) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    marginVertical: 2,
                    borderColor: COLORS.orange,
                    paddingVertical: 5,
                    marginVertical: 5,
                  }}
                  onPress={() => {
                    let tmp = [...answers.kendra_samiti_work];

                    if (tmp.length > 0) {
                      let j = tmp.filter(element => element.key === 999);
                      if (j.length > 0) {
                        tmp = [];
                        tmp.push(el);
                        setAnswers({
                          ...answers,
                          kendra_samiti_work: tmp,
                        });
                      } else {
                        tmp.forEach(function (item, index1) {
                          if (item.value === el.value) {
                            let tmp = [...answers.kendra_samiti_work];
                            tmp.splice(index1, 1);
                            setAnswers({
                              ...answers,
                              kendra_samiti_work: tmp,
                            });
                          } else {
                            let tmp = [...answers.kendra_samiti_work];
                            tmp.push(el);
                            setAnswers({
                              ...answers,
                              kendra_samiti_work: tmp,
                            });
                          }
                        });
                      }
                    } else {
                      tmp.push(el);
                      setAnswers({
                        ...answers,
                        kendra_samiti_work: tmp,
                      });
                    }
                  }}>
                  <Checkbox
                    status={
                      answers.kendra_samiti_work.filter(
                        item => item.value === el.value,
                      ).length > 0
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={COLORS.blue}
                  />
                  <TextHandler
                    style={{
                      color: 'black',
                      // textAlign: 'left',
                    }}>
                    {t(el.label)}
                  </TextHandler>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* QA19 - OK - kendra_effect_on_anti_social_problems*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: answers.kendra_effect_on_anti_social_problems
                  ? COLORS.orange
                  : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.kendra_effect_on_anti_social_problems
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {19}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q21')}
                {/* {answers.kendra_effect_on_anti_social_problems} */}
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
                {
                  key: 1,
                  value: 'Became less',
                  label: 'CENTER_Q21_OPT1',
                },
                {
                  key: 2,
                  value: 'Increased',
                  label: 'CENTER_Q21_OPT2',
                },
                {
                  key: 3,
                  value: 'Not much',
                  label: 'CENTER_Q21_OPT3',
                },
              ]}
              valueProp={answers.kendra_effect_on_anti_social_problems}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  kendra_effect_on_anti_social_problems: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA20 - OK - majorprevelant_problems_in_the_basti */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.majorprevelant_problems_in_the_basti.length > 0
                    ? COLORS.orange
                    : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    answers.majorprevelant_problems_in_the_basti.length > 0
                      ? COLORS.black
                      : COLORS.white,
                  textAlign: 'center',
                }}>
                {20}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q22')}
              </TextHandler>
            </View>
          </View>

          <View>
            {/* <RadioButtons
              radioStyle={{
                borderWidth: 1,
                marginVertical: 2,
                borderColor: COLORS.orange,
              }}
              data={[
                {
                  key: 1,
                  value: 'Addiction (Nasha),                  ',
                  label: 'CENTER_Q22_OPT1',
                },
                {
                  key: 2,
                  value: 'illiteracy',
                  label: 'CENTER_Q22_OPT2',
                },
                {
                  key: 2,
                  value: 'Unemployment',
                  label: 'CENTER_Q22_OPT3',
                },
                {
                  key: 2,
                  value: 'Social Security',
                  label: 'CENTER_Q22_OPT4',
                },
                {
                  key: 2,
                  value: 'Discriminatory environment',
                  label: 'CENTER_Q22_OPT5',
                },
              ]}
              valueProp={answers.majorprevelant_problems_in_the_basti}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  majorprevelant_problems_in_the_basti: item,
                });
              }}
            /> */}
            {[
              {
                key: 1,
                value: 'Addiction (Nasha),                  ',
                label: 'CENTER_Q22_OPT1',
              },
              {
                key: 2,
                value: 'illiteracy',
                label: 'CENTER_Q22_OPT2',
              },
              {
                key: 2,
                value: 'Unemployment',
                label: 'CENTER_Q22_OPT3',
              },
              {
                key: 2,
                value: 'Social Security',
                label: 'CENTER_Q22_OPT4',
              },
              {
                key: 2,
                value: 'Discriminatory environment',
                label: 'CENTER_Q22_OPT5',
              },
            ].map((el, index) => {
              return (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 1,
                    marginVertical: 2,
                    borderColor: COLORS.orange,
                    paddingVertical: 5,
                    marginVertical: 5,
                  }}
                  onPress={() => {
                    let tmp = [...answers.majorprevelant_problems_in_the_basti];

                    if (tmp.length > 0) {
                      let j = tmp.filter(element => element.key === 999);
                      if (j.length > 0) {
                        tmp = [];
                        tmp.push(el);
                        setAnswers({
                          ...answers,
                          majorprevelant_problems_in_the_basti: tmp,
                        });
                      } else {
                        tmp.forEach(function (item, index1) {
                          if (item.value === el.value) {
                            let tmp = [
                              ...answers.majorprevelant_problems_in_the_basti,
                            ];
                            tmp.splice(index1, 1);
                            setAnswers({
                              ...answers,
                              majorprevelant_problems_in_the_basti: tmp,
                            });
                          } else {
                            let tmp = [
                              ...answers.majorprevelant_problems_in_the_basti,
                            ];
                            tmp.push(el);
                            setAnswers({
                              ...answers,
                              majorprevelant_problems_in_the_basti: tmp,
                            });
                          }
                        });
                      }
                    } else {
                      tmp.push(el);
                      setAnswers({
                        ...answers,
                        majorprevelant_problems_in_the_basti: tmp,
                      });
                    }
                  }}>
                  <Checkbox
                    status={
                      answers.majorprevelant_problems_in_the_basti.filter(
                        item => item.value === el.value,
                      ).length > 0
                        ? 'checked'
                        : 'unchecked'
                    }
                    color={COLORS.blue}
                  />
                  <TextHandler
                    style={{
                      color: 'black',
                      // textAlign: 'left',
                    }}>
                    {t(el.label)}
                  </TextHandler>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* QA21 - OK - total_population_of_sewa_bharti_beneficiaries */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.total_population_of_sewa_bharti_beneficiaries
                    ? COLORS.orange
                    : COLORS.red,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: answers.total_population_of_sewa_bharti_beneficiaries
                    ? COLORS.black
                    : COLORS.white,
                  textAlign: 'center',
                }}>
                {21}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q24')}
              </TextHandler>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <Input
              type={'numeric'}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  total_population_of_sewa_bharti_beneficiaries: text,
                });
              }}
              value={answers.total_population_of_sewa_bharti_beneficiaries}
              empty={!answers.total_population_of_sewa_bharti_beneficiaries}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        <Button
          title={t('NEXT')}
          onPress={pageValidator}
          ButtonContainerStyle={{
            marginVertical: 17,
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
  },
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
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
    marginTop: 16,
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
