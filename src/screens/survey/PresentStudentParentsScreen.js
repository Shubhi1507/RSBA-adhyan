import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useContext} from 'react';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import {useDispatch, useSelector} from 'react-redux';
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

export default function PresentStudentParentsScreen() {
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);

  let totalSurveys = store.totalSurveys;
  const dispatch = useDispatch();
  let [answers, setAnswers] = useState({
    // FROM DOCS
    current_students: 0,
    no_of_parents_present: 0,
    educational_background: '',
    economic_status: '',
    reason_for_sending_children_to_the_centre: '',
    how_these_children_go_to_the_centre: '',
    days_children_are_going_to_the_centre: '',

    experience_due_to_the_centre_education_before: '',
    experience_due_to_the_centre_living_before: '',
    experience_due_to_the_centre_behaviour_before: '',
    experience_due_to_the_centre_sanskar_before: '',
    experience_due_to_the_centre_habits_before: '',

    experience_due_to_the_centre_education_after: '',
    experience_due_to_the_centre_living_after: '',
    experience_due_to_the_centre_behaviour_after: '',
    experience_due_to_the_centre_sanskar_after: '',
    experience_due_to_the_centre_habits_after: '',

    benefits_of_the_centre: '',
    involvement_in_the_programs_of_the_centre: '',
    contribution_in_running_centre_more_effectively: '',
    observations_about_kendra_teacher: '',
    expectations_from_the_centre: '',
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
      if (entry?.presentStudentParent) {
        setAnswers(entry.presentStudentParent);
      }
    });
  }, []);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const pageValidator = () => {
    let tmp = store?.currentSurveyData.currentSurveyStatus;
    let new_obj;

    const {
      benefits_of_the_centre,
      contribution_in_running_centre_more_effectively,
      current_students,
      days_children_are_going_to_the_centre,
      economic_status,
      educational_background,
      expectations_from_the_centre,
      experience_due_to_the_centre_behaviour_after,
      experience_due_to_the_centre_behaviour_before,
      experience_due_to_the_centre_education_after,
      experience_due_to_the_centre_education_before,
      experience_due_to_the_centre_habits_after,
      experience_due_to_the_centre_habits_before,
      experience_due_to_the_centre_living_after,
      experience_due_to_the_centre_living_before,
      experience_due_to_the_centre_sanskar_after,
      experience_due_to_the_centre_sanskar_before,
      how_these_children_go_to_the_centre,
      involvement_in_the_programs_of_the_centre,
      no_of_parents_present,
      observations_about_kendra_teacher,
      reason_for_sending_children_to_the_centre,
    } = answers;

    let experience_que_answer_completed =
      experience_due_to_the_centre_behaviour_after &&
      experience_due_to_the_centre_behaviour_before &&
      experience_due_to_the_centre_education_after &&
      experience_due_to_the_centre_education_before &&
      experience_due_to_the_centre_habits_after &&
      experience_due_to_the_centre_habits_before &&
      experience_due_to_the_centre_living_after &&
      experience_due_to_the_centre_living_before &&
      experience_due_to_the_centre_sanskar_after &&
      experience_due_to_the_centre_sanskar_before
        ? true
        : false;

    let experience_que_answer_completed_or_condition =
      experience_due_to_the_centre_behaviour_after ||
      experience_due_to_the_centre_behaviour_before ||
      experience_due_to_the_centre_education_after ||
      experience_due_to_the_centre_education_before ||
      experience_due_to_the_centre_habits_after ||
      experience_due_to_the_centre_habits_before ||
      experience_due_to_the_centre_living_after ||
      experience_due_to_the_centre_living_before ||
      experience_due_to_the_centre_sanskar_after ||
      experience_due_to_the_centre_sanskar_before
        ? true
        : false;

    let q = Object.keys(answers).length - 9;
    let tmp2 = Object.values(answers).filter(el => {
      if (el) return el;
    });

    let p = tmp2.length;
    if (experience_que_answer_completed) {
      p = q;
    }
    if (experience_que_answer_completed_or_condition) {
      if (p !== q) {
        p = q - 1;
      }
    }

    console.log(p, '/', q);
    if (
      !benefits_of_the_centre ||
      !contribution_in_running_centre_more_effectively ||
      !current_students ||
      !days_children_are_going_to_the_centre ||
      !economic_status ||
      !educational_background ||
      !expectations_from_the_centre ||
      !experience_due_to_the_centre_behaviour_after ||
      !experience_due_to_the_centre_behaviour_before ||
      !experience_due_to_the_centre_education_after ||
      !experience_due_to_the_centre_education_before ||
      !experience_due_to_the_centre_habits_after ||
      !experience_due_to_the_centre_habits_before ||
      !experience_due_to_the_centre_living_after ||
      !experience_due_to_the_centre_living_before ||
      !experience_due_to_the_centre_sanskar_after ||
      !experience_due_to_the_centre_sanskar_before ||
      !how_these_children_go_to_the_centre ||
      !involvement_in_the_programs_of_the_centre ||
      !no_of_parents_present ||
      !observations_about_kendra_teacher ||
      !reason_for_sending_children_to_the_centre
    ) {
      new_obj = {
        ...tmp[0],
        attempted: true,
        completed: false,
        disabled: false,
        totalQue: q,
        answered: p,
      };
    } else {
      new_obj = {
        ...tmp[0],
        attempted: true,
        completed: true,
        disabled: true,
        totalQue: q,
        answered: p,
      };
    }
    tmp.splice(0, 1, new_obj);

    let surveyAnswers = [...answersArrTmp];
    let payload = {};

    if (answersArrTmp.length > 0) {
      let new_obj1 = {presentStudentParent: answers};
      let index; 
      surveyAnswers.some(function (entry, i) {
        if (entry?.presentStudentParent) {
          index = i;
        }
      });
      if (index != undefined) {
        surveyAnswers.splice(index, 1, new_obj1);
      } else {
        surveyAnswers.push({presentStudentParent: answers});
      }
    } else {
      surveyAnswers.push({presentStudentParent: answers});
    }
    payload = {
      ...store.currentSurveyData,
      currentSurveyStatus: tmp,
      surveyAnswers,
      updatedAt: new Date().toString(),
    };
    let tmp1 = FindAndUpdate(totalSurveys, payload);
    console.log('tmp1', tmp1);
    console.log('payload', payload);

    dispatch({type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY, payload: payload});
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
    showModal();
  };

  const pageNavigator = () => {
    navigate(ROUTES.AUTH.SELECTAUDIENCESCREEN);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header title={t('STUDENTS_PARENTS_CURRENT_STUDENTS')} onPressBack={goBack} />
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
        {/* QA1 - ok - current_students */}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q1')}
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({...answers, current_students: text});
            }}
            value={answers.current_students}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q2')}
              </TextHandler>
            </View>
          </View>

          <View>
            <Input
              type={'numeric'}
              number={4}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, no_of_parents_present: text});
              }}
              value={answers.no_of_parents_present}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        {/* QA3 - ok - educational_background */}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q3')}
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
                {key: 1, value: 'Illiterate', label: 'ILLITERATE'},
                {key: 2, value: 'Literate', label: 'LITERATE'},
                {key: 3, value: 'Educated', label: 'EDUCATED'},
                {key: 4, value: 'Mix', label: 'MIX'},
              ]}
              valueProp={answers.educational_background}
              onValueChange={item => {
                setAnswers({...answers, educational_background: item});
              }}
            />
          </View>
        </View>

        {/* QA4 - economic_status*/}
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
                {t('CURRENT_STUDENTS_PARENTS_Q4')}
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
              valueProp={answers.economic_status}
              data={[
                {key: 1, value: 'Very Poor', label: 'VERY_POOR'},
                {key: 2, value: 'Poor', label: 'POOR'},
                {key: 3, value: 'Good', label: 'GOOD'},
              ]}
              onValueChange={item => {
                setAnswers({...answers, economic_status: item});
              }}
            />
          </View>
        </View>

        {/* QA5 - reason_for_sending_children_to_the_centre */}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q5')}
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
              valueProp={answers.reason_for_sending_children_to_the_centre}
              data={[
                {
                  key: 1,
                  value: 'Spending free time',
                  label: 'CURRENT_STUDENTS_PARENTS_Q5_OPT1',
                },
                {
                  key: 2,
                  value: 'Good quality education',
                  label: 'CURRENT_STUDENTS_PARENTS_Q5_OPT2',
                },
                {
                  key: 3,
                  value: 'Sanskar',
                  label: 'CURRENT_STUDENTS_PARENTS_Q5_OPT3',
                },
                {key: 4, value: 'Others', label: 'OTHERS'},
              ]}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  reason_for_sending_children_to_the_centre: item,
                });
              }}
            />
          </View>
          {answers.reason_for_sending_children_to_the_centre?.key == 4 && (
            <Input
              type={'default'}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  reason_for_sending_children_to_the_centre: {
                    ...answers.reason_for_sending_children_to_the_centre,
                    reason: text,
                  },
                });
              }}
              value={answers.reason_for_sending_children_to_the_centre?.reason}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          )}
        </View>

        {/* QA6 - how_these_children_go_to_the_centre */}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q6')}
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
              valueProp={answers.how_these_children_go_to_the_centre}
              data={[
                {
                  key: 1,
                  value: 'By their own',
                  label: 'CURRENT_STUDENTS_PARENTS_Q6_OPT1',
                },
                {
                  key: 2,
                  value: 'arranged by Centre karyakartas',
                  label: 'CURRENT_STUDENTS_PARENTS_Q6_OPT2',
                },
                {
                  key: 3,
                  value: 'directed by parents',
                  label: 'CURRENT_STUDENTS_PARENTS_Q6_OPT3',
                },
                {key: 4, value: 'Others', label: 'OTHERS'},
              ]}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  how_these_children_go_to_the_centre: item,
                });
              }}
            />
          </View>
          {answers.how_these_children_go_to_the_centre?.key == 4 && (
            <Input
              type={'default'}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  how_these_children_go_to_the_centre: {
                    ...answers.how_these_children_go_to_the_centre,
                    reason: text,
                  },
                });
              }}
              value={answers.how_these_children_go_to_the_centre?.reason}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          )}
        </View>

        {/* QA7 - days_children_are_going_to_the_centre */}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q7')}
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
              valueProp={answers.days_children_are_going_to_the_centre}
              data={[
                {
                  key: 1,
                  value: '1-6 months',
                  label: 'CURRENT_STUDENTS_PARENTS_Q7_OPT1',
                },
                {
                  key: 2,
                  value: '6 months - 1year',
                  label: 'CURRENT_STUDENTS_PARENTS_Q7_OPT2',
                },
                {
                  key: 3,
                  value: '1-2 years',
                  label: 'CURRENT_STUDENTS_PARENTS_Q7_OPT3',
                },
                {
                  key: 3,
                  value: 'More than 2 years',
                  label: 'CURRENT_STUDENTS_PARENTS_Q7_OPT4',
                },
              ]}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  days_children_are_going_to_the_centre: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA8 - experiences */}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q8')}
              </TextHandler>
            </View>
          </View>

          <View>
            {/* before */}
            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                }}>
                <TextHandler style={styles.question}>
                  {' '}
                  {t('BEFORE')}
                </TextHandler>
              </View>
            </View>

            {/* education */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('EDUCATION')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_education_before: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_education_before}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
            {/* living */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('CURRENT_STUDENTS_PARENTS_Q8_OPT4')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_living_before: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_living_before}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
            {/* behaviour */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('CURRENT_STUDENTS_PARENTS_Q8_OPT5')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_behaviour_before: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_behaviour_before}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
            {/* sanskar */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('CURRENT_STUDENTS_PARENTS_Q8_OPT6')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_sanskar_before: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_sanskar_before}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
            {/* habits */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('CURRENT_STUDENTS_PARENTS_Q8_OPT7')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_habits_before: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_habits_before}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
          </View>

          <View>
            {/* after */}
            <View style={{flexDirection: 'row', marginVertical: 20}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                }}>
                <TextHandler style={styles.question}> {t('AFTER')}</TextHandler>
              </View>
            </View>

            {/* education */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('EDUCATION')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_education_after: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_education_after}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
            {/* living */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('CURRENT_STUDENTS_PARENTS_Q8_OPT4')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_living_after: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_living_after}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
            {/* behaviour */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('CURRENT_STUDENTS_PARENTS_Q8_OPT5')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_behaviour_after: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_behaviour_after}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
            {/* sanskar */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('CURRENT_STUDENTS_PARENTS_Q8_OPT6')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_sanskar_after: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_sanskar_after}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
            {/* habits */}
            <View>
              <TextHandler
                style={{
                  color: 'black',
                }}>
                {t('CURRENT_STUDENTS_PARENTS_Q8_OPT7')}
              </TextHandler>
              <Input
                type={'default'}
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_due_to_the_centre_habits_after: text,
                  });
                }}
                value={answers.experience_due_to_the_centre_habits_after}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            </View>
          </View>
        </View>

        {/* QA9 - benefits_of_the_centre */}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q9')}
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({...answers, benefits_of_the_centre: text});
            }}
            value={answers.benefits_of_the_centre}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
            }}
          />
        </View>

        {/* QA10 -  involvement_in_the_programs_of_the_centre*/}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q10')}
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
              valueProp={answers.involvement_in_the_programs_of_the_centre}
              data={[
                {
                  key: 1,
                  value: 'Financial support',
                  label: 'CURRENT_STUDENTS_PARENTS_Q10_OPT1',
                },
                {
                  key: 2,
                  value: 'Time',
                  label: 'CURRENT_STUDENTS_PARENTS_Q10_OPT2',
                },
                {
                  key: 3,
                  value: 'Shramdan',
                  label: 'CURRENT_STUDENTS_PARENTS_Q10_OPT3',
                },
                {key: 4, value: 'Others', label: 'OTHERS'},
              ]}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  involvement_in_the_programs_of_the_centre: item,
                });
              }}
            />
          </View>
          {answers.involvement_in_the_programs_of_the_centre?.key == 4 && (
            <Input
              type={'default'}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  involvement_in_the_programs_of_the_centre: {
                    ...answers.involvement_in_the_programs_of_the_centre,
                    reason: text,
                  },
                });
              }}
              value={answers.involvement_in_the_programs_of_the_centre?.reason}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          )}
        </View>

        {/* QA11 - contribution_in_running_centre_more_effectively */}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q11')}
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({
                ...answers,
                contribution_in_running_centre_more_effectively: text,
              });
            }}
            value={answers.contribution_in_running_centre_more_effectively}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
            }}
          />
        </View>

        {/* Q12 - observations_about_kendra_teacher*/}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q12')}
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({
                ...answers,
                observations_about_kendra_teacher: text,
              });
            }}
            value={answers.observations_about_kendra_teacher}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
            }}
          />
        </View>

        {/* QA13 - expectations_from_the_centre*/}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q13')}
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({
                ...answers,
                expectations_from_the_centre: text,
              });
            }}
            value={answers.expectations_from_the_centre}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
            }}
          />
        </View>

        <Button
          title={'Submit'}
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
