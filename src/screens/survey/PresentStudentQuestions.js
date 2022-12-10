import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useEffect} from 'react';
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
  SurveyCompletedModal,
  TextHandler,
} from '../../components';
import {useState} from 'react';
import {screenWidth} from '../../libs';
import {ROUTES} from '../../navigation/RouteConstants';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {FindAndUpdate} from '../../utils/utils';
import LocalizationContext from '../../context/LanguageContext';
import {useContext} from 'react';

export default function PresentStudentQuestions() {
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);

  const dispatch = useDispatch();
  let totalSurveys = store.totalSurveys;

  let [answers, setAnswers] = useState({
    // doc
    students_enrolled: '',
    students_coming_regularly: '',
    interest_of_the_students_towards_kendra: '',
    since_how_long_they_are_coming_to_the_prakalp: '',
    _how_they_come_to_prakalp: '',
    do_students_help_other_students: '',
    do_students_get_any_benefit_by_teaching: '',
    students_improvemnet: '',
    decrease_in_results_after_joining_the_kendra: '',
    reason_of_the_decreasing_result: '',
    how_students_get_to_know_about_the_kendra: '',
    other_activities_organised_in_the_center: '',
    go_to_other_coaching: '',
    kendra_organize_regular_parents_teacher_meeting: '',
    conduct_monthly_or_quarterly_tests: '',
    share_results_of_these_tests_with_the_parents: '',
    suggestions_to_improve_the_kendra_activities: '',
    role_model_for_the_student: '',
    regularaly_go_to_rss_shakha: '',
  });
  const [error, setError] = useState({visible: false, message: ''});
  const [visible, setVisible] = React.useState(false);
  let answersArrTmp =
    store?.currentSurveyData?.surveyAnswers &&
    store?.currentSurveyData?.surveyAnswers !== undefined &&
    Array.isArray(store?.currentSurveyData?.surveyAnswers) &&
    store?.currentSurveyData?.surveyAnswers.length > 0
      ? [...store?.currentSurveyData?.surveyAnswers]
      : [];

  useEffect(() => {
    answersArrTmp.some(function (entry, i) {
      if (entry?.presentStudent) {
        console.log('entry?.presentStudent', entry?.presentStudent);
        setAnswers(entry.presentStudent);
      }
    });
  }, []);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const pageNavigator = () => {
    navigate(ROUTES.AUTH.SELECTAUDIENCESCREEN);
  };

  const pageValidator = () => {
    console.log('store', store);
    let tmp = store?.currentSurveyData.currentSurveyStatus;
    let new_obj;
    const {
      _how_they_come_to_prakalp,
      conduct_monthly_or_quarterly_tests,
      decrease_in_results_after_joining_the_kendra,
      do_students_get_any_benefit_by_teaching,
      do_students_help_other_students,
      go_to_other_coaching,
      how_students_get_to_know_about_the_kendra,
      interest_of_the_students_towards_kendra,
      kendra_organize_regular_parents_teacher_meeting,
      other_activities_organised_in_the_center,
      reason_of_the_decreasing_result,
      regularaly_go_to_rss_shakha,
      role_model_for_the_student,
      share_results_of_these_tests_with_the_parents,
      since_how_long_they_are_coming_to_the_prakalp,
      students_coming_regularly,
      students_enrolled,
      students_improvemnet,
      suggestions_to_improve_the_kendra_activities,
    } = answers;
    let q = 19;
    let p = Object.values(answers).filter(el => {
      if (el) return el;
    }).length;
    console.log(p, '/', q);
    if (
      _how_they_come_to_prakalp ||
      conduct_monthly_or_quarterly_tests ||
      decrease_in_results_after_joining_the_kendra ||
      do_students_get_any_benefit_by_teaching ||
      do_students_help_other_students ||
      go_to_other_coaching ||
      how_students_get_to_know_about_the_kendra ||
      interest_of_the_students_towards_kendra ||
      kendra_organize_regular_parents_teacher_meeting ||
      other_activities_organised_in_the_center ||
      reason_of_the_decreasing_result ||
      regularaly_go_to_rss_shakha ||
      role_model_for_the_student ||
      share_results_of_these_tests_with_the_parents ||
      since_how_long_they_are_coming_to_the_prakalp ||
      students_coming_regularly ||
      students_enrolled ||
      students_improvemnet ||
      suggestions_to_improve_the_kendra_activities
    ) {
      new_obj = {
        ...tmp[2],
        attempted: true,
        completed: false,
        disabled: false,
        totalQue: q,
        answered: p,
      };
    } else {
      new_obj = {
        ...tmp[2],
        attempted: true,
        completed: true,
        disabled: true,
        totalQue: q,
        answered: p,
      };
    }
    tmp.splice(2, 1, new_obj);

    let surveyAnswers = [...answersArrTmp];
    let payload = {};
    console.log('answersArrTmp;', answersArrTmp);

    if (answersArrTmp.length > 0) {
      let new_obj1 = {presentStudent: answers};
      let index;
      surveyAnswers.some(function (entry, i) {
        if (entry?.presentStudent) {
          index = i;
        }
      });
      if (index != undefined) {
        surveyAnswers.splice(index, 1, new_obj1);
        console.log('exist presentStudent', index, surveyAnswers);
      } else {
        surveyAnswers.push({presentStudent: answers});
      }
    } else {
      surveyAnswers.push({presentStudent: answers});
    }
    payload = {
      ...store.currentSurveyData,
      currentSurveyStatus: tmp,
      surveyAnswers,
      updatedAt: new Date().toString(),
    };
    let tmp1 = FindAndUpdate(totalSurveys, payload);

    console.log('payload ', payload);
    console.log('tmp ', payload);

    dispatch({type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY, payload: payload});
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
    showModal();
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header title={t('PRESENT_STUDENT')} onPressBack={goBack} />
      </View>
      <SurveyCompletedModal
        visible={visible}
        hideModal={hideModal}
        onClick={pageNavigator}
      />
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        {/* QA1 */}
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
                {t('CURRENT_STUDENTS_Q1')}
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({...answers, students_enrolled: text});
            }}
            value={answers.students_enrolled}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
            }}
          />
        </View>

        {/* QA2 */}
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
                {t('CURRENT_STUDENTS_Q2')}
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
                  value: '20-25%',
                  label: 'CURRENT_STUDENTS_Q2_OPT1',
                },
                {
                  key: 2,
                  value: '40-50%',
                  label: 'CURRENT_STUDENTS_Q2_OPT2',
                },
                {
                  key: 3,
                  value: '65-75% ',
                  label: 'CURRENT_STUDENTS_Q2_OPT3',
                },

                {
                  key: 4,
                  value: 'More than 75%',
                  label: 'CURRENT_STUDENTS_Q2_OPT4',
                },
              ]}
              valueProp={answers.students_coming_regularly}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer2: item});
              }}
            />
          </View>
        </View>

        {/* QA3 */}
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
                {t('CURRENT_STUDENTS_Q3')}
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
                  value: 'Need to remind',
                  label: 'CURRENT_STUDENTS_Q3_OPT1',
                },
                {
                  key: 2,
                  value: 'Parents force them',
                  label: 'CURRENT_STUDENTS_Q3_OPT2',
                },
                {
                  key: 3,
                  value: 'Wait for Center to start',
                  label: 'CURRENT_STUDENTS_Q3_OPT3',
                },
              ]}
              valueProp={answers.interest_of_the_students_towards_kendra}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  interest_of_the_students_towards_kendra: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA4 */}
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
                {t('CURRENT_STUDENTS_Q4')}
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
                value: '6 months',
                label: 'CURRENT_STUDENTS_Q4_OPT1',
              },
              {
                key: 2,
                value: '6-24 months',
                label: 'CURRENT_STUDENTS_Q4_OPT2',
              },
              {
                key: 3,
                value: '2 Years and above',
                label: 'CURRENT_STUDENTS_Q4_OPT3',
              },
            ]}
            valueProp={answers.since_how_long_they_are_coming_to_the_prakalp}
            onValueChange={item => {
              setAnswers({
                ...answers,
                since_how_long_they_are_coming_to_the_prakalp: item,
              });
            }}
          />
        </View>

        {/* QA5  */}
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
                {t('CURRENT_STUDENTS_Q5')}
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
                  value: 'come by own',
                  label: 'CURRENT_STUDENTS_Q5_OPT1',
                },
                {
                  key: 2,
                  value: 'Parents come to pick and drop',
                  label: 'CURRENT_STUDENTS_Q5_OPT2',
                },
                {
                  key: 3,
                  value: 'Students come in group',
                  label: 'CURRENT_STUDENTS_Q5_OPT3',
                },
                {
                  key: 4,
                  value: 'Our centre coordinator assist them',
                  label: 'CURRENT_STUDENTS_Q5_OPT4',
                },
                {
                  key: 5,
                  value: 'Others',
                  label: 'CURRENT_STUDENTS_Q5_OPT5',
                },
              ]}
              valueProp={answers._how_they_come_to_prakalp}
              onValueChange={item => {
                setAnswers({...answers, _how_they_come_to_prakalp: item});
              }}
            />
            {answers._how_they_come_to_prakalp?.key === 5 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    _how_they_come_to_prakalp: {
                      ...answers._how_they_come_to_prakalp,
                      other: text,
                    },
                  });
                }}
                value={answers._how_they_come_to_prakalp?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA6 */}
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
                {t('CURRENT_STUDENTS_Q6')}
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
                {key: 1, value: 'Yes', label: 'YES'},
                {key: 2, value: 'No', label: 'NO'},
              ]}
              valueProp={answers.do_students_help_other_students}
              onValueChange={item => {
                setAnswers({...answers, do_students_help_other_students: item});
              }}
            />
          </View>
        </View>

        {/* QA7*/}
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
                {t('CURRENT_STUDENTS_Q7')}
              </TextHandler>
            </View>
          </View>

          <Input
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({
                ...answers,
                do_students_get_any_benefit_by_teaching: text,
              });
            }}
            value={answers.do_students_get_any_benefit_by_teaching}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>

        {/* QA8 */}
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
                  // textAlign: 'left',
                }}>
                {t('CURRENT_STUDENTS_Q8')}
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
                  value: 'More than 50 % Students',
                  label: 'CURRENT_STUDENTS_Q8_OPT1',
                },
                {
                  key: 2,
                  value: '25 to 49 % Students',
                  label: 'CURRENT_STUDENTS_Q8_OPT2',
                },
                {
                  key: 3,
                  value: '10 to 24 % Students',
                  label: 'CURRENT_STUDENTS_Q8_OPT3',
                },

                {
                  key: 4,
                  value: 'No change in %',
                  label: 'CURRENT_STUDENTS_Q8_OPT4',
                },
              ]}
              valueProp={answers.students_improvemnet}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, students_improvemnet: item});
              }}
            />
          </View>
        </View>

        {/* QA9*/}
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
                  // textAlign: 'left',
                }}>
                {t('CURRENT_STUDENTS_Q9')}
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
              valueProp={answers.decrease_in_results_after_joining_the_kendra}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({
                  ...answers,
                  decrease_in_results_after_joining_the_kendra: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA10 */}
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
                  // textAlign: 'left',
                }}>
                {t('CURRENT_STUDENTS_Q10')}
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
                  value: 'Less focus on studies',
                  label: 'CURRENT_STUDENTS_Q10_OPT1',
                },
                {
                  key: 2,
                  value: 'Capacity of Teachers',
                  label: 'CURRENT_STUDENTS_Q10_OPT2',
                },
                {
                  key: 3,
                  value: 'Surroundings',
                  label: 'CURRENT_STUDENTS_Q10_OPT3',
                },

                {
                  key: 4,
                  value: 'Others',
                  label: 'CURRENT_STUDENTS_Q10_OPT4',
                },
              ]}
              valueProp={answers.reason_of_the_decreasing_result}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, reason_of_the_decreasing_result: item});
              }}
            />
            {answers.reason_of_the_decreasing_result?.key === 4 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    reason_of_the_decreasing_result: {
                      ...answers.reason_of_the_decreasing_result,
                      other: text,
                    },
                  });
                }}
                value={answers.reason_of_the_decreasing_result?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA11*/}
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
                  // textAlign: 'left',
                }}>
                {t('CURRENT_STUDENTS_Q11')}
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
                  value: 'From Home ',
                  label: 'CURRENT_STUDENTS_Q11_OPT1',
                },
                {
                  key: 2,
                  value: 'From Basti',
                  label: 'CURRENT_STUDENTS_Q11_OPT2',
                },
                {
                  key: 3,
                  value: 'From Teachers ',
                  label: 'CURRENT_STUDENTS_Q11_OPT3',
                },

                {
                  key: 4,
                  value: 'Others',
                  label: 'CURRENT_STUDENTS_Q11_OPT4',
                },
              ]}
              valueProp={answers.how_students_get_to_know_about_the_kendra}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  how_students_get_to_know_about_the_kendra: item,
                });
              }}
            />
            {answers.how_students_get_to_know_about_the_kendra?.key === 4 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    how_students_get_to_know_about_the_kendra: {
                      ...answers.how_students_get_to_know_about_the_kendra,
                      other: text,
                    },
                  });
                }}
                value={answers.how_students_get_to_know_about_the_kendra?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA12 */}
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
                  // textAlign: 'left',
                }}>
                {t('CURRENT_STUDENTS_Q12')}
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
                  label: 'CURRENT_STUDENTS_Q12_OPT1',
                },
                {
                  key: 2,
                  value: 'NO',
                  label: 'CURRENT_STUDENTS_Q12_OPT2',
                },
              ]}
              valueProp={answers.other_activities_organised_in_the_center}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  other_activities_organised_in_the_center: item,
                });
              }}
            />
            {answers.other_activities_organised_in_the_center?.key === 1 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    other_activities_organised_in_the_center: {
                      ...answers.other_activities_organised_in_the_center,
                      other: text,
                    },
                  });
                }}
                value={answers.other_activities_organised_in_the_center?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA13 */}
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
                  // textAlign: 'left',
                }}>
                {t('CURRENT_STUDENTS_Q13')}
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
                  value: 'Yes (Enter %)  ',
                  label: 'CURRENT_STUDENTS_Q13_OPT1',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
                {
                  key: 3,
                  value: 'Some ',
                  label: 'CURRENT_STUDENTS_Q13_OPT3',
                },
              ]}
              valueProp={answers.go_to_other_coaching}
              onValueChange={item => {
                setAnswers({...answers, go_to_other_coaching: item});
              }}
            />
            {answers.go_to_other_coaching?.key === 1 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    go_to_other_coaching: {
                      ...answers.go_to_other_coaching,
                      other: text,
                    },
                  });
                }}
                value={answers.go_to_other_coaching?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA14 */}
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
                {14}
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
                {t('CURRENT_STUDENTS_Q14')}
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
                  value: 'Yes ',
                  label: 'YES',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={
                answers.kendra_organize_regular_parents_teacher_meeting
              }
              onValueChange={item => {
                console.log('item', item);
                setAnswers({
                  ...answers,
                  kendra_organize_regular_parents_teacher_meeting: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA15 */}
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
                {15}
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
                {t('CURRENT_STUDENTS_Q15')}
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
                  value: 'Yes ',
                  label: 'YES',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.conduct_monthly_or_quarterly_tests}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  conduct_monthly_or_quarterly_tests: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA16 */}
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
                {16}
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
                {t('CURRENT_STUDENTS_Q16')}
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
                  value: 'Yes ',
                  label: 'CURRENT_STUDENTS_Q16_OPT1',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.share_results_of_these_tests_with_the_parents}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  share_results_of_these_tests_with_the_parents: item,
                });
              }}
            />
            {answers.share_results_of_these_tests_with_the_parents?.key ===
              1 && (
              <>
                <Input
                  placeholder={`${t('ENTER_ANSWER')}`}
                  name="any"
                  onChangeText={text => {
                    setAnswers({
                      ...answers,
                      share_results_of_these_tests_with_the_parents: {
                        ...answers.share_results_of_these_tests_with_the_parents,
                        other: text,
                      },
                    });
                  }}
                  value={
                    answers.share_results_of_these_tests_with_the_parents?.other
                  }
                  message={''}
                  containerStyle={{
                    alignItems: 'center',
                    minWidth: screenWidth * 0.5,
                  }}
                />
              </>
            )}
          </View>
        </View>

        {/* QA17*/}
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
                {17}
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
                {t('CURRENT_STUDENTS_Q17')}
              </TextHandler>
            </View>
          </View>

          <Input
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({
                ...answers,
                suggestions_to_improve_the_kendra_activities: text,
              });
            }}
            value={answers.suggestions_to_improve_the_kendra_activities}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>

        {/* QA18*/}
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
                {18}
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
                {t('CURRENT_STUDENTS_Q18')}
              </TextHandler>
            </View>
          </View>

          <Input
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({
                ...answers,
                role_model_for_the_student: text,
              });
            }}
            value={answers.role_model_for_the_student}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>

        {/* QA19 */}
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
                {19}
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
                {t('CURRENT_STUDENTS_Q19')}
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
                {key: 1, value: 'Yes', label: 'YES'},
                {key: 2, value: 'No', label: 'NO'},
              ]}
              valueProp={answers.regularaly_go_to_rss_shakha}
              onValueChange={item => {
                setAnswers({...answers, regularaly_go_to_rss_shakha: item});
              }}
            />
          </View>
        </View>

        <Button
          title={'Next'}
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
