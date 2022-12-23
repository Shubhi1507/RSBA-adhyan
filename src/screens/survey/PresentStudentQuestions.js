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
    let tmp = store?.currentSurveyData.currentSurveyStatus;
    let new_obj;
    let q = 16;
    let tmpans = [];
    let p = 0;
    Object.values(answers).forEach(el => {
      if (el && Array.isArray(el) && el.length > 0) {
        return tmpans.push(el);
      } else {
        if (typeof el === 'string' && el.length > 0) {
          return tmpans.push(el);
        }
        if (typeof el === 'object' && Object.values(el).length > 0) {
          return tmpans.push(el);
        }
      }
    });
    p = tmpans.length;

    console.log(p, '/', q, tmpans);
    new_obj = {
      ...tmp[2],
      attempted: true,
      completed: p !== q ? false : true,
      disabled: false,
      totalQue: q,
      answered: p,
    };

    tmp.splice(2, 1, new_obj);

    let surveyAnswers = [...answersArrTmp];
    let payload = {};

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
        {/* QA1 - students_enrolled */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.students_enrolled
                  ? COLORS.red
                  : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.students_enrolled
                    ? COLORS.white
                    : COLORS.black,
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
            empty={!answers.students_enrolled}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
            }}
          />
        </View>

        {/* QA2 - students_coming_regularly*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.students_coming_regularly
                  ? COLORS.red
                  : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.students_coming_regularly
                    ? COLORS.white
                    : COLORS.black,
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
                setAnswers({...answers, students_coming_regularly: item});
              }}
            />
          </View>
        </View>

        {/* QA3 - interest_of_the_students_towards_kendra */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.interest_of_the_students_towards_kendra
                    ? COLORS.red
                    : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.interest_of_the_students_towards_kendra
                    ? COLORS.white
                    : COLORS.black,
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
                {
                  key: 4,
                  value: 'Come regularly',
                  label: 'CURRENT_STUDENTS_Q3_OPT4',
                },
                {
                  key: 5,
                  value: 'Very excited to join activities in kendra  ',
                  label: 'CURRENT_STUDENTS_Q3_OPT5',
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

        {/* QA4 - since_how_long_they_are_coming_to_the_prakalp*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.since_how_long_they_are_coming_to_the_prakalp
                    ? COLORS.red
                    : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.since_how_long_they_are_coming_to_the_prakalp
                    ? COLORS.white
                    : COLORS.black,
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

        {/* QA5 - _how_they_come_to_prakalp */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers._how_they_come_to_prakalp
                  ? COLORS.red
                  : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers._how_they_come_to_prakalp
                    ? COLORS.white
                    : COLORS.black,
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
                empty={!answers._how_they_come_to_prakalp?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA6 -do_students_help_other_students  */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.do_students_help_other_students
                  ? COLORS.red
                  : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.do_students_help_other_students
                    ? COLORS.white
                    : COLORS.black,
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

        {/* QA7 -  do_students_get_any_benefit_by_teaching */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.do_students_get_any_benefit_by_teaching
                    ? COLORS.red
                    : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.do_students_get_any_benefit_by_teaching
                    ? COLORS.white
                    : COLORS.black,
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
            empty={!answers.do_students_get_any_benefit_by_teaching}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>

        {/* QA8 - students_improvemnet */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.students_improvemnet
                  ? COLORS.red
                  : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.students_improvemnet
                    ? COLORS.white
                    : COLORS.black,
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
                setAnswers({...answers, students_improvemnet: item});
              }}
            />
          </View>
        </View>

        {/* QA9 - decrease_in_results_after_joining_the_kendra*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.decrease_in_results_after_joining_the_kendra
                    ? COLORS.red
                    : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.decrease_in_results_after_joining_the_kendra
                    ? COLORS.white
                    : COLORS.black,
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
                setAnswers({
                  ...answers,
                  decrease_in_results_after_joining_the_kendra: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA10 - reason_of_the_decreasing_result*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.reason_of_the_decreasing_result
                  ? COLORS.red
                  : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.reason_of_the_decreasing_result
                    ? COLORS.white
                    : COLORS.black,
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
                empty={!answers.reason_of_the_decreasing_result?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA11 - how_students_get_to_know_about_the_kendra*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.how_students_get_to_know_about_the_kendra
                    ? COLORS.red
                    : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.how_students_get_to_know_about_the_kendra
                    ? COLORS.white
                    : COLORS.black,
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
                empty={
                  !answers.how_students_get_to_know_about_the_kendra?.other
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

        {/* QA12 -other_activities_organised_in_the_center */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.other_activities_organised_in_the_center
                    ? COLORS.red
                    : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.other_activities_organised_in_the_center
                    ? COLORS.white
                    : COLORS.black,
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

            {answers.other_activities_organised_in_the_center?.value && (
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
                empty={!answers.other_activities_organised_in_the_center?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA13 - go_to_other_coaching*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.go_to_other_coaching
                  ? COLORS.red
                  : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.go_to_other_coaching
                    ? COLORS.white
                    : COLORS.black,
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
                empty={!answers.go_to_other_coaching?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA14 - kendra_organize_regular_parents_teacher_meeting*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.kendra_organize_regular_parents_teacher_meeting
                    ? COLORS.red
                    : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color:
                    !answers.kendra_organize_regular_parents_teacher_meeting
                      ? COLORS.white
                      : COLORS.black,
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
                setAnswers({
                  ...answers,
                  kendra_organize_regular_parents_teacher_meeting: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA15 */}
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
                {15}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
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
        </View> */}

        {/* QA16 */}
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
                {16}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
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
        </View> */}

        {/* QA15 - suggestions_to_improve_the_kendra_activities */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.suggestions_to_improve_the_kendra_activities
                    ? COLORS.red
                    : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.suggestions_to_improve_the_kendra_activities
                    ? COLORS.white
                    : COLORS.black,
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
            empty={!answers.suggestions_to_improve_the_kendra_activities}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>

        {/* QA16 = regularaly_go_to_rss_shakha*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.regularaly_go_to_rss_shakha
                  ? COLORS.red
                  : COLORS.orange,
                height: 20,
                width: 20,
                borderRadius: 40,
                justifyContent: 'flex-start',
                marginRight: 5,
              }}>
              <TextHandler
                style={{
                  color: !answers.regularaly_go_to_rss_shakha
                    ? COLORS.white
                    : COLORS.black,
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
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
});
