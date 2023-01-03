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
import {Checkbox} from 'react-native-paper';
import {BASE_URL} from '../../networking';
import LoaderIndicator from '../../components/Loader';

export default function PastStudentParentsScreen() {
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const {t} = useContext(LocalizationContext);

  const dispatch = useDispatch();
  const [dataLoading, setDataLoading] = useState(false);
  let [answers, setAnswers] = useState({
    no_of_parents_present: '',
    rating_illiterate: '',
    rating_upto_5th: '',
    rating_upto_10th: '',
    rating_graduation: '',

    econmonic_status_under_1_lakh: '',
    econmonic_status_between_1_and_3_lakh: '',
    econmonic_status_between_3_and_5_lakh: '',
    econmonic_status_between_5_and_10_lakh: '',

    reason_for_sending_children_to_the_centre: '',
    how_these_children_go_to_the_centre: '',
    days_children_are_going_to_the_centre: '',
    children_occupation_nowadays: [],

    rating_good_habits: '',
    rating_patriotism: '',
    rating_good_sanskaar: '',
    rating_study_interest: '',
    rating_development_of_qualities_in_students: '',
    rating_attitude_for_better_life: '',

    involvement_in_the_programs_of_the_centre: '',
    contribution_in_running_centre_more_effectively: '',
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
  let tmp2 = [...answers.children_occupation_nowadays];

  useEffect(() => {
    answersArrTmp.some(function (entry, i) {
      if (entry?.pastStudentParent) {
        setAnswers(entry.pastStudentParent);
      }
    });
  }, []);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const checkarrayforOtherValues = (arr = [], key) => {
    let j = 1;
    arr.map(el => {
      if (el.value === 'Other' || el.value === 'Other') {
        if (!el.hasOwnProperty('other') || !el.other) {
          j = 0;
        }
      }
    });
    return j;
  };

  const pageValidator = async () => {
    setDataLoading(true);
    let tmp = store?.currentSurveyData.currentSurveyStatus;
    let new_obj;
    const {
      children_occupation_nowadays,
      contribution_in_running_centre_more_effectively,
      days_children_are_going_to_the_centre,
      econmonic_status_between_1_and_3_lakh,
      econmonic_status_between_3_and_5_lakh,
      econmonic_status_between_5_and_10_lakh,
      econmonic_status_under_1_lakh,
      expectations_from_the_centre,
      how_these_children_go_to_the_centre,
      involvement_in_the_programs_of_the_centre,
      no_of_parents_present,
      rating_attitude_for_better_life,
      rating_development_of_qualities_in_students,
      rating_good_habits,
      rating_good_sanskaar,
      rating_graduation,
      rating_illiterate,
      rating_patriotism,
      rating_study_interest,
      rating_upto_10th,
      rating_upto_5th,
      reason_for_sending_children_to_the_centre,
    } = answers;
    let q = 11;
    let unanswered = 11;
    try {
      let ans1 = !no_of_parents_present ? 0 : 1;
      let ans2 =
        rating_illiterate &&
        rating_upto_5th &&
        rating_upto_10th &&
        rating_graduation
          ? 1
          : 0;
      let ans3 =
        econmonic_status_under_1_lakh &&
        econmonic_status_between_1_and_3_lakh &&
        econmonic_status_between_3_and_5_lakh &&
        econmonic_status_between_5_and_10_lakh &&
        econmonic_status_under_1_lakh +
          econmonic_status_between_1_and_3_lakh +
          econmonic_status_between_3_and_5_lakh +
          econmonic_status_between_5_and_10_lakh !==
          100
          ? 1
          : 0;
      let ans4 =
        reason_for_sending_children_to_the_centre?.value === 'Other' &&
        !reason_for_sending_children_to_the_centre?.other
          ? 0
          : !reason_for_sending_children_to_the_centre?.value
          ? 0
          : 1;
      let ans5 =
        how_these_children_go_to_the_centre?.value === 'Other' &&
        !how_these_children_go_to_the_centre?.other
          ? 0
          : !how_these_children_go_to_the_centre?.value
          ? 0
          : 1;
      let ans6 = !days_children_are_going_to_the_centre ? 0 : 1;
      // let ans7 = children_occupation_nowadays.length > 0 ? 1 : 0;
      let ans7 =
        children_occupation_nowadays.length !== 0
          ? checkarrayforOtherValues(children_occupation_nowadays, 'other')
          : 0;
      let ans8 =
        rating_good_habits &&
        rating_patriotism &&
        rating_good_sanskaar &&
        rating_study_interest &&
        rating_development_of_qualities_in_students &&
        rating_attitude_for_better_life
          ? 1
          : 0;
      let ans9 =
        involvement_in_the_programs_of_the_centre?.value === 'Other' &&
        !involvement_in_the_programs_of_the_centre?.other
          ? 0
          : !involvement_in_the_programs_of_the_centre?.value
          ? 0
          : 1;

      let ans10 = !contribution_in_running_centre_more_effectively ? 0 : 1;
      let ans11 = !expectations_from_the_centre ? 0 : 1;

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
          ans11);

      console.log(q - p, '/', q);

      new_obj = {
        ...tmp[1],
        attempted: true,
        completed: p === 0 ? true : false,
        disabled: false,
        totalQue: q,
        answered: q - p,
      };

      // return console.log(new_obj);
      tmp.splice(1, 1, new_obj);

      let surveyAnswers = [...answersArrTmp];
      let payload = {};

      if (answersArrTmp.length > 0) {
        let new_obj1 = {pastStudentParent: answers};
        let index;
        surveyAnswers.some(function (entry, i) {
          if (entry?.pastStudentParent) {
            index = i;
          }
        });
        if (index != undefined) {
          surveyAnswers.splice(index, 1, new_obj1);
        } else {
          surveyAnswers.push({pastStudentParent: answers});
        }
      } else {
        surveyAnswers.push({pastStudentParent: answers});
      }
      payload = {
        ...store.currentSurveyData,
        currentSurveyStatus: tmp,
        surveyAnswers,
        updatedAt: new Date().toString(),
      };
      let tmp1 = FindAndUpdate(totalSurveys, payload);

      // completed survey. calling api
      if (p === 0) {
        let surveydata = {
          // 'No of parents present'
          38: `${no_of_parents_present}`,
          // 'Educational background ( Enter the percentage data )'
          39: `Illiterate-${rating_illiterate}, Upto 5th(%) - ${rating_upto_5th}, Upto 10th(%) - ${rating_upto_10th}, Graduation and above(%) - ${rating_graduation}`,
          // 'Economic status ( Enter the percentage data )'
          40: `Less than 1 Lac (%)-${econmonic_status_under_1_lakh}, 1 to 3 Lacs (%) - ${econmonic_status_between_1_and_3_lakh}, 3 to 5 Lacs (%) - ${econmonic_status_between_3_and_5_lakh}, 5 to 10 Lacs (%) - ${econmonic_status_between_5_and_10_lakh}`,
          // 'Reason for sending children to the center?'
          41: `${
            reason_for_sending_children_to_the_centre?.other ||
            reason_for_sending_children_to_the_centre?.value
          }`,
          // 'How these children go to the center?'
          42: `${
            how_these_children_go_to_the_centre?.other ||
            how_these_children_go_to_the_centre?.value
          }`,
          // 'Number of days children went to the centre?'
          43: `${days_children_are_going_to_the_centre?.value || ' '}`,
          // 'What are your children doing currently? - (More than one option can be selected )'
          44: `${children_occupation_nowadays?.map(el => {
            if (el?.value === 'Other') {
              return el?.other + ' | ';
            }
            return el?.value + ' | ';
          })}`,
          // 'To what extent the center is helpful in the overall development of your children?  Rate your answer out of 10 where 1 = Poor & 10 = Best'
          45: `Good habits - ${rating_good_habits}, Patriotism - ${rating_patriotism}, Good Sanskar - ${rating_good_sanskaar}, Increased interest in study - ${rating_study_interest}, Development of qualities in students - ${rating_development_of_qualities_in_students}, Attitude for better life-${rating_attitude_for_better_life}`,
          // 'Now how are you involved in the running of the centre '
          46: `${
            involvement_in_the_programs_of_the_centre?.other ||
            involvement_in_the_programs_of_the_centre?.value
          }`,
          // 'How can you contribute in running Centre more effectively'
          47: `${contribution_in_running_centre_more_effectively}`,
          // 'Expectations from the Centre'
          48: `${expectations_from_the_centre}`,
        };
        console.log('surveydata', surveydata);

        const surveyform = new FormData();
        surveyform.append('center_id', store?.currentSurveyData?.api_centre_id);
        surveyform.append('audience_id', 9);
        surveyform.append('survey_data', JSON.stringify(surveydata));
        const requestOptions = {
          method: 'POST',
          body: surveyform,
          redirect: 'follow',
        };

        const response = await fetch(
          BASE_URL + 'center/survey',
          requestOptions,
        );
        console.log('response->', await response.json());

        console.log('payload', payload);
      }

      dispatch({
        type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
        payload: payload,
      });
      dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
      showModal();
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
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
      children_occupation_nowadays: tmp2,
    });
  };

  return (
    <View style={styles.container}>
      <LoaderIndicator loading={dataLoading} />
      <View style={{flex: 0.2}}>
        <Header
          title={t('STUDENTS_PARENTS_PAST_STUDENTS')}
          onPressBack={goBack}
        />
        <SurveyCompletedModal
          visible={visible}
          hideModal={hideModal}
          onClick={pageNavigator}
        />
      </View>
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        {/* QA1  - no_of_parents_present*/}
        <View style={{marginBottom: 10}}>
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
                {1}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('PAST_STUDENTS_PARENTS_Q1')}
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
              empty={!answers.no_of_parents_present}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        {/* QA2 - ok  */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.rating_illiterate ||
                  !answers.rating_upto_5th ||
                  !answers.rating_upto_10th ||
                  !answers.rating_graduation ||
                  parseFloat(answers.rating_illiterate) +
                  parseFloat(answers.rating_upto_5th) +
                  parseFloat(answers.rating_upto_10th) +
                  parseFloat(answers.rating_graduation) !==
                  100
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
                    !answers.rating_graduation ||
                    parseFloat(answers.rating_illiterate) +
                    parseFloat(answers.rating_upto_5th) +
                    parseFloat(answers.rating_upto_10th) +
                    parseFloat(answers.rating_graduation) !==
                    100
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
                {t('PAST_STUDENTS_PARENTS_Q2')}
              </TextHandler>
              {parseFloat(answers.rating_illiterate) +
                parseFloat(answers.rating_upto_5th) +
                parseFloat(answers.rating_upto_10th) +
                parseFloat(answers.rating_graduation) !==
                100 && (
                <TextHandler style={{fontSize: 10, color: COLORS.red}}>
                  {t('SUM_NOT_100')}
                </TextHandler>
              )}
            </View>
          </View>

          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q2_OPT1')}</TextHandler>
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
          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q2_OPT2')}</TextHandler>
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
          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q2_OPT3')}</TextHandler>
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
          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q2_OPT4')}</TextHandler>
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

        {/* QA3  */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.econmonic_status_under_1_lakh ||
                  !answers.econmonic_status_between_1_and_3_lakh ||
                  !answers.econmonic_status_between_3_and_5_lakh ||
                  !answers.econmonic_status_between_5_and_10_lakh ||
                  parseFloat(answers.econmonic_status_under_1_lakh) +
                    parseFloat(answers.econmonic_status_between_1_and_3_lakh) +
                    parseFloat(answers.econmonic_status_between_3_and_5_lakh) +
                    parseFloat(
                      answers.econmonic_status_between_5_and_10_lakh,
                    ) !==
                    100
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
                    !answers.econmonic_status_between_5_and_10_lakh ||
                    parseFloat(answers.econmonic_status_under_1_lakh) +
                      parseFloat(
                        answers.econmonic_status_between_1_and_3_lakh,
                      ) +
                      parseFloat(
                        answers.econmonic_status_between_3_and_5_lakh,
                      ) +
                      parseFloat(
                        answers.econmonic_status_between_5_and_10_lakh,
                      ) !==
                      100
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
                {t('PAST_STUDENTS_PARENTS_Q3')}
              </TextHandler>
              {parseFloat(answers.econmonic_status_under_1_lakh) +
                parseFloat(answers.econmonic_status_between_1_and_3_lakh) +
                parseFloat(answers.econmonic_status_between_3_and_5_lakh) +
                parseFloat(answers.econmonic_status_between_5_and_10_lakh) !==
                100 && (
                <TextHandler style={{fontSize: 10, color: COLORS.red}}>
                  {t('SUM_NOT_100')}
                </TextHandler>
              )}
            </View>
          </View>

          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q3_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
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
          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q3_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
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
          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q3_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
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
          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q3_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
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

        {/* QA4 - reason_for_sending_children_to_the_centre */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.reason_for_sending_children_to_the_centre ||
                  (answers.reason_for_sending_children_to_the_centre?.value ===
                    'Other' &&
                    !answers.reason_for_sending_children_to_the_centre?.other)
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
                    !answers.reason_for_sending_children_to_the_centre ||
                    (answers.reason_for_sending_children_to_the_centre
                      ?.value === 'Other' &&
                      !answers.reason_for_sending_children_to_the_centre?.other)
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
                {t('PAST_STUDENTS_PARENTS_Q4')}
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
                {key: 4, value: 'Other', label: 'OTHERS'},
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
                    other: text,
                  },
                });
              }}
              value={answers.reason_for_sending_children_to_the_centre?.other}
              empty={!answers.reason_for_sending_children_to_the_centre?.other}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          )}
        </View>

        {/* QA5 - how_these_children_go_to_the_centre */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.how_these_children_go_to_the_centre ||
                  (answers.how_these_children_go_to_the_centre?.value ===
                    'Other' &&
                    !answers.how_these_children_go_to_the_centre?.other)
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
                    !answers.how_these_children_go_to_the_centre ||
                    (answers.how_these_children_go_to_the_centre?.value ===
                      'Other' &&
                      !answers.how_these_children_go_to_the_centre?.other)
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
                {t('PAST_STUDENTS_PARENTS_Q5')}
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
                {key: 4, value: 'Other', label: 'OTHERS'},
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
                    other: text,
                  },
                });
              }}
              value={answers.how_these_children_go_to_the_centre?.other}
              empty={!answers.how_these_children_go_to_the_centre?.other}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          )}
        </View>

        {/* QA6 - days_children_are_going_to_the_centre */}
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
                {6}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('PAST_STUDENTS_PARENTS_Q6')}
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

        {/* QA7 - children_occupation_nowadays */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  // answers.children_occupation_nowadays.length === 0
                  answers.children_occupation_nowadays.length !== 0
                    ? checkarrayforOtherValues(
                        answers.children_occupation_nowadays,
                        'other',
                      ) === 1
                      ? COLORS.orange
                      : COLORS.red
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
                    answers.children_occupation_nowadays.length !== 0
                      ? checkarrayforOtherValues(
                          answers.children_occupation_nowadays,
                          'other',
                        ) === 1
                        ? COLORS.black
                        : COLORS.white
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
                {t('PAST_STUDENTS_PARENTS_Q7')}
              </TextHandler>
            </View>
          </View>

          <View>
            {[
              {
                key: 1,
                value: 'Service',
                label: 'PAST_STUDENTS_PARENTS_Q7_OPT1',
              },
              {
                key: 2,
                value: 'Labour',
                label: 'PAST_STUDENTS_PARENTS_Q7_OPT2',
              },
              {
                key: 3,
                value: 'Self employed',
                label: 'PAST_STUDENTS_PARENTS_Q7_OPT3',
              },
              {
                key: 4,
                value: 'Other',
                label: 'OTHERS',
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
                      answers.children_occupation_nowadays.filter(
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
            {answers.children_occupation_nowadays.filter(
              item => item.value === 'Other',
            ).length > 0 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  let tmp = [...answers.children_occupation_nowadays];
                  tmp.forEach((el, index) => {
                    if (el.value === 'Other') {
                      let newans = {...el, other: text};
                      tmp.splice(index, 1, newans);
                    }
                  });
                  setAnswers({
                    ...answers,
                    children_occupation_nowadays: tmp,
                  });
                }}
                value={
                  answers.children_occupation_nowadays.filter(
                    el => el.value === 'Other',
                  ).length > 0
                    ? answers.children_occupation_nowadays.filter(
                        el => el.value === 'Other',
                      )[0]?.['other']
                    : ''
                }
                // empty={!answers.children_occupation_nowadays?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.25,
                }}
              />
            )}
          </View>
        </View>

        {/* QA8  - develpoment_of_children*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.rating_good_habits ||
                  !answers.rating_patriotism ||
                  !answers.rating_good_sanskaar ||
                  !answers.rating_study_interest ||
                  !answers.rating_development_of_qualities_in_students ||
                  !answers.rating_attitude_for_better_life
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
                    !answers.rating_good_habits ||
                    !answers.rating_patriotism ||
                    !answers.rating_good_sanskaar ||
                    !answers.rating_study_interest ||
                    !answers.rating_development_of_qualities_in_students ||
                    !answers.rating_attitude_for_better_life
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
                {t('PAST_STUDENTS_PARENTS_Q8')}
              </TextHandler>
            </View>
          </View>

          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q8_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({...answers, rating_good_habits: text});
                }
              }}
              value={answers.rating_good_habits}
              empty={!answers.rating_good_habits}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q8_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({...answers, rating_patriotism: text});
                }
              }}
              value={answers.rating_patriotism}
              empty={!answers.rating_patriotism}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q8_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({...answers, rating_good_sanskaar: text});
                }
              }}
              value={answers.rating_good_sanskaar}
              empty={!answers.rating_good_sanskaar}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q8_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({...answers, rating_study_interest: text});
                }
              }}
              value={answers.rating_study_interest}
              empty={!answers.rating_study_interest}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>

          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q8_OPT5')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({
                    ...answers,
                    rating_development_of_qualities_in_students: text,
                  });
                }
              }}
              value={answers.rating_development_of_qualities_in_students}
              empty={!answers.rating_development_of_qualities_in_students}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>

          <View>
            <TextHandler>{t('PAST_STUDENTS_PARENTS_Q8_OPT6')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({
                    ...answers,
                    rating_attitude_for_better_life: text,
                  });
                }
              }}
              value={answers.rating_attitude_for_better_life}
              empty={!answers.rating_attitude_for_better_life}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* QA9 -  involvement_in_the_programs_of_the_centre*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.involvement_in_the_programs_of_the_centre ||
                  (answers.involvement_in_the_programs_of_the_centre?.value ===
                    'Other' &&
                    !answers.involvement_in_the_programs_of_the_centre?.other)
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
                    !answers.involvement_in_the_programs_of_the_centre ||
                    (answers.involvement_in_the_programs_of_the_centre
                      ?.value === 'Other' &&
                      !answers.involvement_in_the_programs_of_the_centre?.other)
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
                {t('PAST_STUDENTS_PARENTS_Q9')}
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
                  value: 'Connecting other children to the centre',
                  label: 'PAST_STUDENTS_PARENTS_Q9_OPT1',
                },
                {
                  key: 2,
                  value: 'Financial support',
                  label: 'PAST_STUDENTS_PARENTS_Q9_OPT2',
                },
                {
                  key: 3,
                  value: 'Time',
                  label: 'PAST_STUDENTS_PARENTS_Q9_OPT3',
                },
                {key: 4, value: 'Other', label: 'OTHERS'},
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
                    other: text,
                  },
                });
              }}
              value={answers.involvement_in_the_programs_of_the_centre?.other}
              empty={!answers.involvement_in_the_programs_of_the_centre?.other}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          )}
        </View>

        {/* QA10 - contribution_in_running_centre_more_effectively */}
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
                {10}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('PAST_STUDENTS_PARENTS_Q10')}
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

        {/* QA11 - expectations_from_the_centre*/}
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
                {11}
              </TextHandler>
            </View>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('PAST_STUDENTS_PARENTS_Q11')}
              </TextHandler>
            </View>
          </View>

          <Input
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({...answers, expectations_from_the_centre: text});
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
