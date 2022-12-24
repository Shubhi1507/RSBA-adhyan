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
    current_students: '',
    no_of_parents_present: '',
    rating_illiterate: '',
    rating_upto_5th: '',
    rating_upto_10th: '',
    rating_graduation: '',
    econmonic_status_under_1_lakh: '',
    econmonic_status_between_1_and_3_lakh: '',
    econmonic_status_between_3_and_5_lakh: '',
    econmonic_status_between_5_and_10_lakh: '',
    reason_for_sending_children_to_the_centre: [],
    how_these_children_go_to_the_centre: '',
    days_children_are_going_to_the_centre: '',
    listening_skills: '',
    concentration: '',
    studies_interest: '',
    overall_academic_performance: '',
    clean_and_neat_clothes: '',
    yoga_exercise: '',
    nutritious_food: '',
    follow_proper_daily_routine: '',
    rating_respect_elders: '',
    do_not_back_answer_or_fight_with_friend: '',
    rating_leadership_skills: '',
    rating_helpful_others: '',
    rating_religious_practice: '',
    rating_knowledge_of_vedic_times_and_imp_saints: '',
    rating_nationalism_knowledge: '',
    rating_care_for_our_people: '',
    rating_kendra_teacher_good_behaviour: '',
    rating_kendra_teacher_effective_management: '',
    rating_kendra_teacher_teaching_ability: '',
    rating_kendra_teacher_connect_with_parents: '',
    expectations_from_the_centre: '',

    benefits_of_the_centre: '',
    involvement_in_the_programs_of_the_centre: '',
    contribution_in_running_centre_more_effectively: '',
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
  let tmp2 = [...answers.reason_for_sending_children_to_the_centre];

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
    try {
      const {
        benefits_of_the_centre,
        contribution_in_running_centre_more_effectively,
        current_students,
        days_children_are_going_to_the_centre,
        expectations_from_the_centre,
        how_these_children_go_to_the_centre,
        involvement_in_the_programs_of_the_centre,
        no_of_parents_present,
        reason_for_sending_children_to_the_centre,
        rating_illiterate,
        rating_upto_5th,
        rating_upto_10th,
        rating_graduation,
        econmonic_status_under_1_lakh,
        econmonic_status_between_1_and_3_lakh,
        econmonic_status_between_3_and_5_lakh,
        econmonic_status_between_5_and_10_lakh,
        listening_skills,
        concentration,
        studies_interest,
        overall_academic_performance,
        clean_and_neat_clothes,
        yoga_exercise,
        nutritious_food,
        follow_proper_daily_routine,
        rating_respect_elders,
        do_not_back_answer_or_fight_with_friend,
        rating_leadership_skills,
        rating_helpful_others,
        rating_religious_practice,
        rating_knowledge_of_vedic_times_and_imp_saints,
        rating_nationalism_knowledge,
        rating_care_for_our_people,
        rating_kendra_teacher_good_behaviour,
        rating_kendra_teacher_effective_management,
        rating_kendra_teacher_teaching_ability,
        rating_kendra_teacher_connect_with_parents,
      } = answers;

      let q = 16;
      let unanswered = 16;
      let ans1 = !current_students ? 0 : 1;
      let ans2 = !no_of_parents_present ? 0 : 1;
      let ans3 =
        rating_illiterate &&
        rating_upto_5th &&
        rating_upto_10th &&
        rating_graduation
          ? 1
          : 0;
      let ans4 =
        econmonic_status_under_1_lakh &&
        econmonic_status_between_1_and_3_lakh &&
        econmonic_status_between_3_and_5_lakh &&
        econmonic_status_between_5_and_10_lakh
          ? 1
          : 0;
      let ans5 = reason_for_sending_children_to_the_centre.length > 0 ? 1 : 0;
      let ans6 = !how_these_children_go_to_the_centre ? 0 : 1;
      let ans7 = !days_children_are_going_to_the_centre ? 0 : 1;
      let ans8 =
        listening_skills &&
        concentration &&
        studies_interest &&
        overall_academic_performance
          ? 1
          : 0;
      let ans9 =
        clean_and_neat_clothes &&
        yoga_exercise &&
        nutritious_food &&
        follow_proper_daily_routine
          ? 1
          : 0;
      let ans10 =
        rating_respect_elders &&
        do_not_back_answer_or_fight_with_friend &&
        rating_leadership_skills &&
        rating_helpful_others
          ? 1
          : 0;
      let ans11 =
        rating_religious_practice &&
        rating_knowledge_of_vedic_times_and_imp_saints &&
        rating_nationalism_knowledge &&
        rating_care_for_our_people
          ? 1
          : 0;
      let ans12 = !benefits_of_the_centre ? 0 : 1;
      let ans13 = !involvement_in_the_programs_of_the_centre ? 0 : 1;
      let ans14 = !contribution_in_running_centre_more_effectively ? 0 : 1;
      let ans15 =
        rating_kendra_teacher_good_behaviour &&
        rating_kendra_teacher_effective_management &&
        rating_kendra_teacher_teaching_ability &&
        rating_kendra_teacher_connect_with_parents
          ? 1
          : 0;
      let ans16 = !expectations_from_the_centre ? 0 : 1;

      let tmp2 = Object.values(answers).filter(el => {
        if (el) return el;
      });

      let p =
        unanswered -
        (ans1 +
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
          ans16);

      console.log(q - p, '/', q);
      new_obj = {
        ...tmp[0],
        attempted: true,
        completed: q - p == 0 ? true : false,
        disabled: false,
        totalQue: q,
        answered: q - p,
      };
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

      dispatch({
        type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
        payload: payload,
      });
      dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
      showModal();
    } catch (error) {
      setError({visible: true, message: t('SOMETHING_WENT_WRONG')});
      console.log('error', error);
    }
  };

  const pageNavigator = () => {
    navigate(ROUTES.AUTH.SELECTAUDIENCESCREEN);
  };

  const handleSelection = answer => {
    if (tmp2.length === 0) {
      tmp2.push(answer);
    } else {
      const isExist = tmp2.some(element => answer.key === element.key);
      if (isExist) {
        // remove
        const index = tmp2.findIndex(element => answer.key === element.key);
        tmp2.splice(index, 1);
      } else {
        // different ans chosen
        tmp2.push(answer);
      }
    }
    setAnswers({
      ...answers,
      reason_for_sending_children_to_the_centre: tmp2,
    });
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
                backgroundColor: !answers.current_students
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
                  color: !answers.current_students
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
                {t('CURRENT_STUDENTS_PARENTS_Q1')}
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={10}
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({...answers, current_students: text});
            }}
            value={answers.current_students}
            empty={!answers.current_students}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
            }}
          />
        </View>

        {/* QA2 - no_of_parents_present */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.no_of_parents_present
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
                  color: !answers.no_of_parents_present
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
                {t('CURRENT_STUDENTS_PARENTS_Q2')}
              </TextHandler>
            </View>
          </View>

          <View>
            <Input
              type={'numeric'}
              number={10}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, no_of_parents_present: text});
              }}
              value={answers.no_of_parents_present}
              empty={!answers.no_of_parents_present}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        {/* QA3 - ok - rating_illiterate */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.rating_illiterate ||
                  !answers.rating_upto_5th ||
                  !answers.rating_upto_10th ||
                  !answers.rating_graduation
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
                    !answers.rating_illiterate ||
                    !answers.rating_upto_5th ||
                    !answers.rating_upto_10th ||
                    !answers.rating_graduation
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
                {t('CURRENT_STUDENTS_PARENTS_Q3')}
              </TextHandler>
            </View>
          </View>

          {/* QA3_1 */}
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q3_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={3}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 100) {
                  setAnswers({...answers, rating_illiterate: text});
                }
              }}
              value={answers.rating_illiterate}
              empty={!answers.rating_illiterate}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          {/* QA3_2 */}
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q3_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={3}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 100) {
                  setAnswers({...answers, rating_upto_5th: text});
                }
              }}
              value={answers.rating_upto_5th}
              empty={!answers.rating_upto_5th}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          {/* QA3_3 */}
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q3_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={3}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 100) {
                  setAnswers({...answers, rating_upto_10th: text});
                }
              }}
              value={answers.rating_upto_10th}
              empty={!answers.rating_upto_10th}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          {/* QA3_4 */}
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q3_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={3}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 100) {
                  setAnswers({...answers, rating_graduation: text});
                }
              }}
              value={answers.rating_graduation}
              empty={!answers.rating_graduation}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* QA4 - economic_statuses*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.econmonic_status_under_1_lakh ||
                  !answers.econmonic_status_between_1_and_3_lakh ||
                  !answers.econmonic_status_between_3_and_5_lakh ||
                  !answers.econmonic_status_between_5_and_10_lakh
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
                    !answers.econmonic_status_under_1_lakh ||
                    !answers.econmonic_status_between_1_and_3_lakh ||
                    !answers.econmonic_status_between_3_and_5_lakh ||
                    !answers.econmonic_status_between_5_and_10_lakh
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
                {t('CURRENT_STUDENTS_PARENTS_Q4')}
              </TextHandler>
            </View>
          </View>

          {/* QA4_1 */}
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q4_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={3}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 100) {
                  setAnswers({...answers, econmonic_status_under_1_lakh: text});
                }
              }}
              value={answers.econmonic_status_under_1_lakh}
              empty={!answers.econmonic_status_under_1_lakh}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          {/* QA4_2 */}

          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q4_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={3}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 100) {
                  setAnswers({
                    ...answers,
                    econmonic_status_between_1_and_3_lakh: text,
                  });
                }
              }}
              value={answers.econmonic_status_between_1_and_3_lakh}
              empty={!answers.econmonic_status_between_1_and_3_lakh}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          {/* QA4_3 */}

          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q4_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={3}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 100) {
                  setAnswers({
                    ...answers,
                    econmonic_status_between_3_and_5_lakh: text,
                  });
                }
              }}
              value={answers.econmonic_status_between_3_and_5_lakh}
              empty={!answers.econmonic_status_between_3_and_5_lakh}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          {/* QA4_4 */}
          <View>
            <TextHandler>{t('CURRENT_STUDENTS_PARENTS_Q4_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={3}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 100) {
                  setAnswers({
                    ...answers,
                    econmonic_status_between_5_and_10_lakh: text,
                  });
                }
              }}
              value={answers.econmonic_status_between_5_and_10_lakh}
              empty={!answers.econmonic_status_between_5_and_10_lakh}
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
                backgroundColor:
                  !answers.reason_for_sending_children_to_the_centre.length > 0
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
                    !answers.reason_for_sending_children_to_the_centre.length >
                    0
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
                {t('CURRENT_STUDENTS_PARENTS_Q5')}
              </TextHandler>
            </View>
          </View>

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
                  handleSelection(el);
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
              empty={
                !answers.reason_for_sending_children_to_the_centre?.['other']
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
                backgroundColor: !answers.how_these_children_go_to_the_centre
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
                  color: !answers.how_these_children_go_to_the_centre
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
              empty={!answers.how_these_children_go_to_the_centre?.reason}
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
                backgroundColor: !answers.days_children_are_going_to_the_centre
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
                  color: !answers.days_children_are_going_to_the_centre
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
                backgroundColor:
                  !answers.listening_skills ||
                  !answers.concentration ||
                  !answers.studies_interest ||
                  !answers.overall_academic_performance
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
                    !answers.listening_skills ||
                    !answers.concentration ||
                    !answers.studies_interest ||
                    !answers.overall_academic_performance
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
                if (text <= 10) {
                  setAnswers({...answers, listening_skills: text});
                }
              }}
              value={answers.listening_skills}
              empty={!answers.listening_skills}
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
                if (text <= 10) {
                  setAnswers({...answers, concentration: text});
                }
              }}
              value={answers.concentration}
              empty={!answers.concentration}
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
                if (text <= 10) {
                  setAnswers({...answers, studies_interest: text});
                }
              }}
              value={answers.studies_interest}
              empty={!answers.studies_interest}
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
                if (text <= 10) {
                  setAnswers({...answers, overall_academic_performance: text});
                }
              }}
              value={answers.overall_academic_performance}
              empty={!answers.overall_academic_performance}
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
                backgroundColor:
                  !answers.clean_and_neat_clothes ||
                  !answers.yoga_exercise ||
                  !answers.nutritious_food ||
                  !answers.follow_proper_daily_routine
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
                    !answers.clean_and_neat_clothes ||
                    !answers.yoga_exercise ||
                    !answers.nutritious_food ||
                    !answers.follow_proper_daily_routine
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
                if (text <= 10) {
                  setAnswers({...answers, clean_and_neat_clothes: text});
                }
              }}
              value={answers.clean_and_neat_clothes}
              empty={!answers.clean_and_neat_clothes}
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
                if (text <= 10) {
                  setAnswers({...answers, yoga_exercise: text});
                }
              }}
              value={answers.yoga_exercise}
              empty={!answers.yoga_exercise}
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
                if (text <= 10) {
                  setAnswers({...answers, nutritious_food: text});
                }
              }}
              value={answers.nutritious_food}
              empty={!answers.nutritious_food}
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
                if (text <= 10) {
                  setAnswers({...answers, follow_proper_daily_routine: text});
                }
              }}
              value={answers.follow_proper_daily_routine}
              empty={!answers.follow_proper_daily_routine}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* QA10 -  */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.rating_respect_elders ||
                  !answers.do_not_back_answer_or_fight_with_friend ||
                  !answers.rating_leadership_skills ||
                  !answers.rating_helpful_others
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
                    !answers.rating_respect_elders ||
                    !answers.do_not_back_answer_or_fight_with_friend ||
                    !answers.rating_leadership_skills ||
                    !answers.rating_helpful_others
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
                if (text <= 10) {
                  setAnswers({...answers, rating_respect_elders: text});
                }
              }}
              value={answers.rating_respect_elders}
              empty={!answers.rating_respect_elders}
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
                if (text <= 10) {
                  setAnswers({
                    ...answers,
                    do_not_back_answer_or_fight_with_friend: text,
                  });
                }
              }}
              value={answers.do_not_back_answer_or_fight_with_friend}
              empty={!answers.do_not_back_answer_or_fight_with_friend}
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
                if (text <= 10) {
                  setAnswers({...answers, rating_leadership_skills: text});
                }
              }}
              value={answers.rating_leadership_skills}
              empty={!answers.rating_leadership_skills}
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
                if (text <= 10) {
                  setAnswers({...answers, rating_helpful_others: text});
                }
              }}
              value={answers.rating_helpful_others}
              empty={!answers.rating_helpful_others}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* QA11 -  */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.rating_religious_practice ||
                  !answers.rating_knowledge_of_vedic_times_and_imp_saints ||
                  !answers.rating_nationalism_knowledge ||
                  !answers.rating_care_for_our_people
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
                    !answers.rating_religious_practice ||
                    !answers.rating_knowledge_of_vedic_times_and_imp_saints ||
                    !answers.rating_nationalism_knowledge ||
                    !answers.rating_care_for_our_people
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
                if (text <= 10) {
                  setAnswers({...answers, rating_religious_practice: text});
                }
              }}
              value={answers.rating_religious_practice}
              empty={!answers.rating_religious_practice}
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
                if (text <= 10) {
                  setAnswers({
                    ...answers,
                    rating_knowledge_of_vedic_times_and_imp_saints: text,
                  });
                }
              }}
              value={answers.rating_knowledge_of_vedic_times_and_imp_saints}
              empty={!answers.rating_knowledge_of_vedic_times_and_imp_saints}
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
                if (text <= 10) {
                  setAnswers({...answers, rating_nationalism_knowledge: text});
                }
              }}
              value={answers.rating_nationalism_knowledge}
              empty={!answers.rating_nationalism_knowledge}
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
                if (text <= 10) {
                  setAnswers({...answers, rating_care_for_our_people: text});
                }
              }}
              value={answers.rating_care_for_our_people}
              empty={!answers.rating_care_for_our_people}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* Q12 */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.benefits_of_the_centre
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
                  color: !answers.benefits_of_the_centre
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
            empty={!answers.benefits_of_the_centre}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>

        {/* QA13 - */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.involvement_in_the_programs_of_the_centre
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
                  color: !answers.involvement_in_the_programs_of_the_centre
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
              valueProp={answers.involvement_in_the_programs_of_the_centre}
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
              empty={!answers.involvement_in_the_programs_of_the_centre?.reason}
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
                backgroundColor:
                  !answers.contribution_in_running_centre_more_effectively
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
                    !answers.contribution_in_running_centre_more_effectively
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
            empty={!answers.contribution_in_running_centre_more_effectively}
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
                backgroundColor:
                  !answers.rating_kendra_teacher_good_behaviour ||
                  !answers.rating_kendra_teacher_effective_management ||
                  !answers.rating_kendra_teacher_teaching_ability ||
                  !answers.rating_kendra_teacher_connect_with_parents
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
                    !answers.rating_kendra_teacher_good_behaviour ||
                    !answers.rating_kendra_teacher_effective_management ||
                    !answers.rating_kendra_teacher_teaching_ability ||
                    !answers.rating_kendra_teacher_connect_with_parents
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
                if (text <= 10) {
                  setAnswers({
                    ...answers,
                    rating_kendra_teacher_good_behaviour: text,
                  });
                }
              }}
              value={answers.rating_kendra_teacher_good_behaviour}
              empty={!answers.rating_kendra_teacher_good_behaviour}
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
                if (text <= 10) {
                  setAnswers({
                    ...answers,
                    rating_kendra_teacher_effective_management: text,
                  });
                }
              }}
              value={answers.rating_kendra_teacher_effective_management}
              empty={!answers.rating_kendra_teacher_effective_management}
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
                if (text <= 10) {
                  setAnswers({
                    ...answers,
                    rating_kendra_teacher_teaching_ability: text,
                  });
                }
              }}
              value={answers.rating_kendra_teacher_teaching_ability}
              empty={!answers.rating_kendra_teacher_teaching_ability}
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
                if (text <= 10) {
                  setAnswers({
                    ...answers,
                    rating_kendra_teacher_connect_with_parents: text,
                  });
                }
              }}
              value={answers.rating_kendra_teacher_connect_with_parents}
              empty={!answers.rating_kendra_teacher_connect_with_parents}
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
                backgroundColor: !answers.expectations_from_the_centre
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
                  color: !answers.expectations_from_the_centre
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
            empty={!answers.expectations_from_the_centre}
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
