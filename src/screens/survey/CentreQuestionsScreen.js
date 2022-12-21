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

export default function CentreQuestionsScreen() {
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);
  let totalSurveys = store.totalSurveys;
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
    total_population_of_the_basti: '',
    total_population_of_sewa_bharti_beneficiaries: '',
  });
  const [error, setError] = useState({visible: false, message: ''});

  const dispatch = useDispatch();

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

  const pageValidator = () => {
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
      total_population_of_the_basti,
      visitors_details_captured,
    } = answers;

    const {center_details} = store.currentSurveyData;


  //   let answer4 =
  //   rating_need_for_education && rating_no_spare_time_of_parents && rating_no_facility && rating_work_expansion && rating_community_demand
  //     ? true
  //     : false;

  // if (answer4 === true) {
  //   p = p - 3;
  // } else {
  //   if (
  //     rating_need_for_education.length > 0 ||
  //     rating_no_spare_time_of_parents.length > 0 ||
  //     rating_no_facility.length > 0 ||
  //     rating_work_expansion.length > 0 ||
  //     rating_community_demand
  //   ) {
  //     p = p - 1;
  //   }
  // }

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
      total_population_of_the_basti,
      kendra_samiti_work,
      visitors_details_captured,
    };

    let payload = {
      ...store.currentSurveyData,
      center_details: new_centre_details,
      updatedAt: new Date().toString(),
    };

    let tmp = FindAndUpdate(totalSurveys, payload);
    console.log('new payload cqs', payload);
    console.log('new sv arr', tmp);
    dispatch({
      type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
      payload: payload,
    });
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp});
    navigate(ROUTES.AUTH.SELECTAUDIENCESCREEN);
  };

  return (
    <View style={styles.container}>
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
                backgroundColor: COLORS.orange,
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
            <TextHandler>{t('CENTER_Q4_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_need_for_education: text});
              }}
              value={answers.rating_need_for_education}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CENTER_Q4_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_no_spare_time_of_parents: text});
              }}
              value={answers.rating_no_spare_time_of_parents}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CENTER_Q4_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_no_facility: text});
              }}
              value={answers.rating_no_facility}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CENTER_Q4_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_work_expansion: text});
              }}
              value={answers.rating_work_expansion}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>

          <View>
            <TextHandler>{t('CENTER_Q4_OPT5')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_community_demand: text});
              }}
              value={answers.rating_community_demand}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
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
                {
                  key: 1,
                  value: 'Less than 1 month',
                  label: 'CENTER_Q6_DISCONTINUED_CENTER_OPT1',
                },
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

        {/* QA7 - OK - infrastructure*/}
        {/* <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: COLORS.orange,
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
                {key: 1, label: 'CENTER_Q5_OPT1', value: 'Open Air'},
                {
                  key: 2,
                  label: 'CENTER_Q5_OPT2',
                  value: 'Classroom (rented or owned)',
                },
                {key: 3, label: 'CENTER_Q5_OPT3', value: 'Community Hall'},
              ]}
              valueProp={answers.infrastructure}
              onValueChange={item => {
                setAnswers({...answers, infrastructure: item});
              }}
            />
          </View>
        </View> */}

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

        {/* QA- - OK - project_init_before*/}
        {/* <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: COLORS.orange,
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
                {t('CENTER_Q9')}
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
                  value: 'Yes , Please select from below',
                  label: 'CENTER_Q9_OPT1',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.project_init_before}
              onValueChange={item => {
                setAnswers({...answers, project_init_before: item});
              }}
            />
          </View>
        </View> */}
        {/* QA8A - OK - project_init_before item */}
        {/* {answers.project_init_before?.key === 1 && (
          <View>
            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <View
                style={{
                  backgroundColor: COLORS.orange,
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
                  }}>
                  {9 + '.a'}
                </TextHandler>
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                }}>
                <TextHandler
                  style={{
                    color: 'black',
                  }}>
                  {t('CENTER_Q9_OPT1')}
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
                    label: 'CENTER_Q9_OPT1_PT1',
                    value: 'Same as the current',
                  },
                  {
                    key: 2,
                    label: 'CENTER_Q9_OPT1_PT2',
                    value:
                      'New initiative (Health camp / Blood donation camp / aadhar card or any other initiative)',
                  },
                ]}
                valueProp={answers.project_init_before?.item}
                onValueChange={item => {
                  setAnswers({
                    ...answers,
                    project_init_before: {...answers.project_init_before, item},
                  });
                }}
              />
            </View>
          </View>
        )} */}

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

        {/* QA10 - OK - sewa_sanstha_running_the_centerx */}
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
        {/* QA11 - OK - visitors_details_captured */}
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

        {/* QA12 - OK - availability_of_infrastructure */}
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

        {/* QA13 - OK - participation_of_the_basti_people */}
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

        {/* QA14 - OK - is_participation_of_basti_satisfactory */}
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

        {/* QA15 - OK - divyang_and_single_parent_students_enrolled */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.divyang_and_single_parent_students_enrolled
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
                  color: answers.divyang_and_single_parent_students_enrolled
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

        {/* QA16 - OK - basti_toli_active */}
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

        {/* QA17 - OK - oppose_of_the_kendras_activities_by_basti */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.oppose_of_the_kendras_activities_by_basti
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
                  color: answers.oppose_of_the_kendras_activities_by_basti
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
                  value: 'Yes (Enter details) ',
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
                      reason: text,
                    },
                  });
                }}
                value={
                  answers.oppose_of_the_kendras_activities_by_basti?.reason
                }
                empty={
                  !answers.oppose_of_the_kendras_activities_by_basti?.reason
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

        {/* QA18 - OK - members_of_basti_toli_reside_in_same_area */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.members_of_basti_toli_reside_in_same_area
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
                  color: answers.members_of_basti_toli_reside_in_same_area
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
                  value: 'No , please explain',
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
                        reason: text,
                      },
                    });
                  }}
                  value={
                    answers.members_of_basti_toli_reside_in_same_area?.reason
                  }
                  empty={
                    !answers.members_of_basti_toli_reside_in_same_area?.reason
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

        {/* QA19 - OK - role_of_our_kendra_in_our_basti_during__corona */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.role_of_our_kendra_in_our_basti_during__corona
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
                  color: answers.role_of_our_kendra_in_our_basti_during__corona
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

        {/* QA21 - OK - majorprevelant_problems_in_the_basti */}
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

        {/* QA22 - OK - total_population_of_the_basti */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.total_population_of_the_basti?.hindu &&
                  answers.total_population_of_the_basti?.others
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
                    answers.total_population_of_the_basti?.hindu &&
                    answers.total_population_of_the_basti?.others
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
                {t('CENTER_Q23')}
              </TextHandler>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <TextHandler
              style={{
                color: 'black',
              }}>
              {t('HINDU')}
            </TextHandler>
            <Input
              type={'numeric'}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  total_population_of_the_basti: {
                    ...answers.total_population_of_the_basti,
                    hindu: text,
                  },
                });
              }}
              value={answers.total_population_of_the_basti?.hindu}
              empty={!answers.total_population_of_the_basti?.hindu}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
            <TextHandler
              style={{
                color: 'black',
                marginTop: 10,
              }}>
              {t('OTHERS')}
            </TextHandler>
            <Input
              type={'numeric'}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  total_population_of_the_basti: {
                    ...answers.total_population_of_the_basti,
                    others: text,
                  },
                });
              }}
              value={answers.total_population_of_the_basti?.others}
              empty={!answers.total_population_of_the_basti?.others}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        {/* QA23 - OK - total_population_of_sewa_bharti_beneficiaries */}
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
                {22}
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
