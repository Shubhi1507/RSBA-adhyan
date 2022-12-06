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

export default function CentreQuestionsScreen() {
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);
  let totalSurveys = store.totalSurveys;
  let [answers, setAnswers] = useState({
    // establishment: '',
    // infrastructure: '',
    // regularity: '',
    // discontinued_due_to: '',
    // type_of_basti: '',
    // project_init_before: '',
    establishment: '',
    centre_commence_motive: '',
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
    oppose_of_the_kendras_activities_by_basti: '',
    divyang_and_single_parent_students_enrolled: '',
    basti_toli_active: '',
    members_of_basti_toli_reside_in_same_area: '',
    role_of_our_kendra_in_our_basti_during__corona: '',
    kendra_effect_on_anti_social_problems: '',
    majorprevelant_problems_in_the_basti_: '',
    total_population_of_the_basti_hindu: '',
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
            {t('CENTER_INFO')}
          </Text>
        </View>
      </View>
    );
  };

  const pageValidator = () => {
    const {
      establishment,
      infrastructure,
      regularity,
      discontinued_due_to,
      type_of_basti,
      project_init_before,
    } = answers;
    const {center_details} = store.currentSurveyData;
    // if (!establishment || !infrastructure || !regularity || !discontinued_due_to || !type_of_basti || !project_init_before) {
    //   return setError({
    //     visible: true,
    //     message: 'Please answer all questionaires',
    //   });
    // }
    // if (establishment.length < 4 || establishment > 2023 || establishment < 1800) {
    //   return setError({
    //     visible: true,
    //     message: 'Invalid year entered',
    //   });
    // }
    let new_centre_details = {
      ...center_details,
      establishment: establishment,
      infrastructure: infrastructure,
      regularity: regularity,
      discontinued_due_to: discontinued_due_to,
      type_of_basti: type_of_basti,
      project_init_before: project_init_before,
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
        <Header children={HeaderContent()} />
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
                {1}
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
                  // textAlign: 'left',
                }}>
                {t('CENTER_Q1')}
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder="Enter answer here"
            name="any"
            onChangeText={text => {
              setAnswers({...answers, establishment: text});
            }}
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
                {2}
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
                  // textAlign: 'left',
                }}>
                {t('CENTER_Q2')}
              </TextHandler>
            </View>
          </View>

          <Input
            placeholder="Enter answer here"
            name="any"
            onChangeText={text => {
              setAnswers({...answers, centre_commence_motive: text});
            }}
            value={answers.centre_commence_motive}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
            }}
          />
        </View>

        {/* QA3 - OK - students_passed_out_from_centre */}
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
                {3}
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
                  // textAlign: 'left',
                }}>
                {t('CENTER_Q3')}
              </TextHandler>
            </View>
          </View>

          <View>
            <Input
              placeholder="Enter answer here"
              type={'numeric'}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, students_passed_out_from_centre: text});
              }}
              value={answers.students_passed_out_from_centre}
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
              <TextHandler
                style={{
                  color: 'black',
                  // textAlign: 'left',
                }}>
                {t('CENTER_Q4')}
              </TextHandler>
            </View>
          </View>

          <View>
            <Input
              placeholder="Enter answer here"
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  centre_not_operational_aftermath: text,
                });
              }}
              value={answers.centre_not_operational_aftermath}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        {/* QA5 - OK - center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time*/}
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
                {5}
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
                  // textAlign: 'left',
                }}>
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

        {/* QA5A - OK - center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time item */}
        {answers
          .center_is_operating_continuously_since_its_inception_or_is_it_closed_for_some_time
          ?.key === 2 && (
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
                  {5 + '.a'}
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
                    // textAlign: 'left',
                  }}>
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
                {6}
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
                  // textAlign: 'left',
                }}>
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
                {7}
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
                  // textAlign: 'left',
                }}>
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
        </View>

        {/* QA8 - OK - project_init_before*/}
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
                {8}
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
                  value: 'Yes',
                  label: 'YES',
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
        </View>
        {/* QA8A - OK - project_init_before item */}
        {answers.project_init_before?.key === 1 && (
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
                  {8 + '.a'}
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
                    key: 3,
                    value: 'CENTER_Q9_OPT1_PT2',
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
        )}

        {/* QA9 - OK - pictures_of_bharatmata_and_indian_legends */}
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
                {9}
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
                {10}
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
                {11}
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
                {12}
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
                {13}
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
                setAnswers({...answers, participation_of_the_basti_people: item});
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

    // alignItems: 'center',
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
