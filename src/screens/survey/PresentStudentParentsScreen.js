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
import {Checkbox} from 'react-native-paper';

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
    reason_for_sending_children_to_the_centre: [],
    how_these_children_go_to_the_centre: '',
    days_children_are_going_to_the_centre: '',

    experience_due_to_the_centre_education_before: '',
    overall_living_0f_students: '',
    experience_due_to_the_centre_living_before: '',
    experience_due_to_the_centre_behaviour_before: '',
    experience_due_to_the_centre_sanskar_before: '',
    experience_due_to_the_centre_habits_before: '',
    behaviour_and_habit_change: '',

    experience_due_to_the_centre_education_after: '',
    experience_due_to_the_centre_living_after: '',
    experience_due_to_the_centre_behaviour_after: '',
    experience_due_to_the_centre_sanskar_after: '',
    experience_due_to_the_centre_habits_after: '',

    benefits_of_the_centre: '',
    involvement_in_the_programs_of_the_centre: '',
    contribution_in_running_centre_more_effectively: '',
    observations_about_kendra_teacher: '',
    change_among_students_of_tradition: '',
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
      overall_living_0f_students,
      behaviour_and_habit_change,
      experience_due_to_the_centre_habits_after,
      experience_due_to_the_centre_habits_before,
      experience_due_to_the_centre_living_after,
      experience_due_to_the_centre_living_before,
      experience_due_to_the_centre_sanskar_after,
      experience_due_to_the_centre_sanskar_before,
      how_these_children_go_to_the_centre,
      involvement_in_the_programs_of_the_centre,
      no_of_parents_present,

      change_among_students_of_tradition,
      observations_about_kendra_teacher,
      reason_for_sending_children_to_the_centre,
    } = answers;
    let answer3 =
      rating_academic &&
      rating_behaviour_pattern &&
      rating_sports &&
      rating_culture
        ? true
        : false;

    if (answer3 === true) {
      p = p - 3;
    } else {
      if (
        rating_illiterate.length > 0 ||
        rating_upto_5.length > 0 ||
        rating_upto_10.length > 0 ||
        rating_graduation.length > 0
      ) {
        p = p - 1;
      }
    }

    let answer4 =
      rating_academic &&
      rating_behaviour_pattern &&
      rating_sports &&
      rating_culture
        ? true
        : false;

    if (answer4 === true) {
      p = p - 3;
    } else {
      if (
        rating_1_lakh.length > 0 ||
        rating_upto_3_lakh.length > 0 ||
        rating_upto_5_lakh.length > 0 ||
        rating_upto_10_lakh.length > 0
      ) {
        p = p - 1;
      }
    }

    let answer8 =
      listening_skills && concentration && studies_interest && overall_academic
        ? true
        : false;

    if (answer8 === true) {
      p = p - 3;
    } else {
      if (
        listening_skills.length > 0 ||
        concentration.length > 0 ||
        studies_interest.length > 0 ||
        overall_academic.length > 0
      ) {
        p = p - 1;
      }
    }

    let answer9 =
      clean_clothes && yoga_exercise && home_food && daily_routine
        ? true
        : false;

    if (answer9 === true) {
      p = p - 3;
    } else {
      if (
        clean_clothes.length > 0 ||
        yoga_exercise.length > 0 ||
        home_food.length > 0 ||
        daily_routine.length > 0
      ) {
        p = p - 1;
      }
    }

    let answer10 =
      rating_respect_elders &&
      rating_no_fight_with_friend &&
      rating_leadership &&
      rating_helpful
        ? true
        : false;

    if (answer10 === true) {
      p = p - 3;
    } else {
      if (
        rating_respect_elders.length > 0 ||
        rating_no_fight_with_friend.length > 0 ||
        rating_leadership.length > 0 ||
        rating_helpful.length > 0
      ) {
        p = p - 1;
      }
    }

    let answer11 =
      rating_religious_practice &&
      rating_vedic_times &&
      rating_nationalism &&
      rating_care_for_our_people
        ? true
        : false;

    if (answer11 === true) {
      p = p - 3;
    } else {
      if (
        rating_religious_practice.length > 0 ||
        rating_vedic_times.length > 0 ||
        rating_nationalism.length > 0 ||
        rating_care_for_our_people.length > 0
      ) {
        p = p - 1;
      }
    }

    let answer15 =
      good_behaviour && kendra_management && teaching_ability && parents_connect
        ? true
        : false;

    if (answer15 === true) {
      p = p - 3;
    } else {
      if (
        good_behaviour.length > 0 ||
        kendra_management.length > 0 ||
        teaching_ability.length > 0 ||
        parents_connect.length > 0
      ) {
        p = p - 1;
      }
    }




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
      overall_living_0f_students &&
      behaviour_and_habit_change &&
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
      !change_among_students_of_tradition ||
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
        <Header
          title={t('STUDENTS_PARENTS_CURRENT_STUDENTS')}
          onPressBack={goBack}
        />
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
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q3_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_illiterate: text});
              }}
              value={answers.rating_illiterate}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q3_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_upto_5: text});
              }}
              value={answers.rating_upto_5}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q3_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_upto_10: text});
              }}
              value={answers.rating_upto_10}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q3_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_graduation: text});
              }}
              value={answers.rating_graduation}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
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
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q4_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_1_lakh: text});
              }}
              value={answers.rating_1_lakh}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q4_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_upto_3_lakh: text});
              }}
              value={answers.rating_upto_3_lakh}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q4_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_upto_5_lakh: text});
              }}
              value={answers.rating_upto_5_lakh}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q4_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_upto_10_lakh: text});
              }}
              value={answers.rating_upto_10_lakh}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
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
          {/* <RadioButtons
            radioStyle={{
              borderWidth: 1,
              marginVertical: 2,
              borderColor: COLORS.orange,
            }}
            data={[
              {
                key: 1,
                value: 'Economic',
                label: 'INFLUENTIAL_PEOPELE_Q1_OPT1',
              },
              {
                key: 2,
                value: 'Social',
                label: 'INFLUENTIAL_PEOPELE_Q1_OPT2',
              },
              {
                key: 3,
                value: 'Others',
                label: 'INFLUENTIAL_PEOPELE_Q1_OPT3',
              },
            ]}
            valueProp={answers.donors_and_well_wishers_help}
            onValueChange={item => {
              setAnswers({...answers, donors_and_well_wishers_help: item});
            }}
          /> */}

          {[
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
              value: 'Sanskaar',
              label: 'CURRENT_STUDENTS_PARENTS_Q5_OPT3',
            },
            {
              key: 4,
              value: 'Others',
              label: 'CURRENT_STUDENTS_PARENTS_Q5_OPT4',
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
                  let tmp = [
                    ...answers.reason_for_sending_children_to_the_centre,
                  ];

                  if (tmp.length > 0) {
                    let j = tmp.filter(element => element.key === 999);
                    if (j.length > 0) {
                      tmp = [];
                      tmp.push(el);
                      setAnswers({
                        ...answers,
                        reason_for_sending_children_to_the_centre: tmp,
                      });
                    } else {
                      tmp.forEach(function (item, index1) {
                        if (item.value === el.value) {
                          let tmp = [
                            ...answers.reason_for_sending_children_to_the_centre,
                          ];
                          tmp.splice(index1, 1);
                          setAnswers({
                            ...answers,
                            reason_for_sending_children_to_the_centre: tmp,
                          });
                        } else {
                          let tmp = [
                            ...answers.reason_for_sending_children_to_the_centre,
                          ];
                          tmp.push(el);
                          setAnswers({
                            ...answers,
                            reason_for_sending_children_to_the_centre: tmp,
                          });
                        }
                      });
                    }
                  } else {
                    tmp.push(el);
                    setAnswers({
                      ...answers,
                      reason_for_sending_children_to_the_centre: tmp,
                    });
                  }
                }}>
                <Checkbox
                  status={
                    answers.reason_for_sending_children_to_the_centre.filter(
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
          {answers.reason_for_sending_children_to_the_centre.filter(
            item => item.value === 'Others',
          ).length > 0 && (
            <Input
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                let tmp = [
                  ...answers.reason_for_sending_children_to_the_centre,
                ];
                tmp.forEach((el, index) => {
                  if (el.value === 'Others') {
                    let newans = {...el, other: text};
                    tmp.splice(index, 1, newans);
                  }
                });
                setAnswers({
                  ...answers,
                  reason_for_sending_children_to_the_centre: tmp,
                });
              }}
              value={
                answers.reason_for_sending_children_to_the_centre.filter(
                  el => el.value === 'Others',
                ).length > 0
                  ? answers.reason_for_sending_children_to_the_centre.filter(
                      el => el.value === 'Others',
                    )[0]?.['other']
                  : ''
              }
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
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
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q8_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, listening_skills: text});
              }}
              value={answers.listening_skills}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q8_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, concentration: text});
              }}
              value={answers.concentration}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q8_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, studies_interest: text});
              }}
              value={answers.studies_interest}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q8_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, overall_academic: text});
              }}
              value={answers.overall_academic}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* QA9 - overall_living_0f_students */}
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

          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q9_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, clean_clothes: text});
              }}
              value={answers.clean_clothes}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q9_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, yoga_exercise: text});
              }}
              value={answers.yoga_exercise}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q9_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, home_food: text});
              }}
              value={answers.home_food}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q9_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, daily_routine: text});
              }}
              value={answers.daily_routine}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* QA10 -  behaviour_and_habit_change*/}
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
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q10_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_respect_elders: text});
              }}
              value={answers.rating_respect_elders}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q10_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_no_fight_with_friend: text});
              }}
              value={answers.rating_no_fight_with_friend}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q10_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_leadership: text});
              }}
              value={answers.rating_leadership}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q10_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_helpful: text});
              }}
              value={answers.rating_helpful}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
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

          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q11_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_religious_practice: text});
              }}
              value={answers.rating_religious_practice}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q11_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_vedic_times: text});
              }}
              value={answers.rating_vedic_times}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q11_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_nationalism: text});
              }}
              value={answers.rating_nationalism}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q11_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_care_for_our_people: text});
              }}
              value={answers.rating_care_for_our_people}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
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
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({...answers, benefits_of_the_centre: text});
            }}
            value={answers.benefits_of_the_centre}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
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
                  value: 'Financial Support',
                  label: 'CURRENT_STUDENTS_PARENTS_Q13_OPT1',
                },
                {
                  key: 2,
                  value: 'Time',
                  label: 'CURRENT_STUDENTS_PARENTS_Q13_OPT2',
                },
                {
                  key: 3,
                  value: 'Shramdan',
                  label: 'CURRENT_STUDENTS_PARENTS_Q13_OPT3',
                },
                {
                  key: 4,
                  value: 'Others',
                  label: 'CURRENT_STUDENTS_PARENTS_Q13_OPT4',
                },
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

        {/* QA14 -contribution_in_running_centre_more_effectively */}

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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q14')}
              </TextHandler>
            </View>
          </View>

          <Input
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
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>

        {/* QA15 - observation_about_kendra_teacher*/}

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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q15')}
              </TextHandler>
            </View>
          </View>

          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q15_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_religious_practice: text});
              }}
              value={answers.rating_religious_practice}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q15_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_vedic_times: text});
              }}
              value={answers.rating_vedic_times}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q15_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_nationalism: text});
              }}
              value={answers.rating_nationalism}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q15_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_care_for_our_people: text});
              }}
              value={answers.rating_care_for_our_people}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* QA16 - */}
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
              <TextHandler style={styles.question}>
                {t('CURRENT_STUDENTS_PARENTS_Q16')}
              </TextHandler>
            </View>
          </View>

          <Input
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
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>



        <Button
          title={t('SUBMIT')}
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
