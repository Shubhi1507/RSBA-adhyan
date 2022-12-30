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

export default function PastStudentQuestions() {
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const {t} = useContext(LocalizationContext);

  const dispatch = useDispatch();
  let [answers, setAnswers] = useState({
    friends_coming_to_center_the_days: '',
    is_the_center_same_as_before: '',
    how_many_years_were_you_coming_to_the_center: '',
    reason_for_leaving_the_center: '',
    still_associated_with_the_center: '',
    still_associated_with_the_center_reasons: [],
    encourage_other_students_join_the_center: '',
    how_the_center_has_influnced_your_overall_personality: [],
    reasons_for_change_in_your_personality: [],
    how_the_center_has_influnced_your_personality: [],
    experience_between_you_n_other_students_who_do_not_come_to_kendra: [],
    difference_noticed_in_the_family_due_to_the_center: [],
    contribute_in_betterment_of_the_center: '',
    connected_with_sangh_organizations: '',
    involved_in_any_othe_social_activities: '',
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
      if (entry?.pastStudent) {
        console.log(entry?.pastStudent);
        setAnswers(entry.pastStudent);
      }
    });
  }, []);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const pageNavigator = () => {
    navigate(ROUTES.AUTH.SELECTAUDIENCESCREEN);
  };

  const checkarrayforOtherValues = (arr = [], key) => {
    let j = 1;
    arr.map(el => {
      if (el.value === 'Others' || el.value === 'Other') {
        if (!el.hasOwnProperty('other') || !el.other) {
          j = 0;
        }
      }
    });
    return j;
  };

  const pageValidator = () => {
    let tmp = store?.currentSurveyData.currentSurveyStatus;
    let new_obj;
    let q = 14;
    let unanswered = 14;

    const {
      connected_with_sangh_organizations,
      contribute_in_betterment_of_the_center,
      difference_noticed_in_the_family_due_to_the_center,
      encourage_other_students_join_the_center,
      experience_between_you_n_other_students_who_do_not_come_to_kendra,
      friends_coming_to_center_the_days,
      how_many_years_were_you_coming_to_the_center,
      how_the_center_has_influnced_your_overall_personality,
      how_the_center_has_influnced_your_personality,
      involved_in_any_othe_social_activities,
      is_the_center_same_as_before,
      reason_for_leaving_the_center,
      reasons_for_change_in_your_personality,
      still_associated_with_the_center,
      still_associated_with_the_center_reasons,
    } = answers;

    let ans1 = !friends_coming_to_center_the_days ? 0 : 1;
    let ans2 = !is_the_center_same_as_before ? 0 : 1;
    let ans3 = !how_many_years_were_you_coming_to_the_center ? 0 : 1;
    let ans4 =
      reason_for_leaving_the_center?.value === 'Other' &&
      !reason_for_leaving_the_center?.other
        ? 0
        : !reason_for_leaving_the_center?.value
        ? 0
        : 1;
    let ans5 =
      !still_associated_with_the_center ||
      (still_associated_with_the_center?.value === 'Yes' &&
        still_associated_with_the_center_reasons.length === 0)
        ? 0
        : 1;
    let ans6 =
      how_the_center_has_influnced_your_overall_personality.length > 0 ? 1 : 0;
    let ans7 = reasons_for_change_in_your_personality.length > 0 ? 1 : 0;
    // reasons_for_change_in_your_personality.length !== 0
    //   ? checkarrayforOtherValues(
    //       reasons_for_change_in_your_personality,
    //       'other',
    //     )
    //   : 0;
    let ans8 = !encourage_other_students_join_the_center ? 0 : 1;
    let ans9 =
      how_the_center_has_influnced_your_personality.length !== 0
        ? checkarrayforOtherValues(
            how_the_center_has_influnced_your_personality,
            'other',
          )
        : 0;
    let ans10 =
      experience_between_you_n_other_students_who_do_not_come_to_kendra.length !==
      0
        ? checkarrayforOtherValues(
            experience_between_you_n_other_students_who_do_not_come_to_kendra,
            'other',
          )
        : 0;
    let ans11 =
      difference_noticed_in_the_family_due_to_the_center.length !== 0
        ? checkarrayforOtherValues(
            difference_noticed_in_the_family_due_to_the_center,
            'other',
          )
        : 0;
    let ans12 =
      contribute_in_betterment_of_the_center?.value === 'Other' &&
      !contribute_in_betterment_of_the_center?.other
        ? 0
        : !contribute_in_betterment_of_the_center?.value
        ? 0
        : 1;

    let ans13 = !connected_with_sangh_organizations ? 0 : 1;
    let ans14 =
      involved_in_any_othe_social_activities?.value === 'Yes' &&
      !involved_in_any_othe_social_activities?.other
        ? 0
        : !involved_in_any_othe_social_activities?.value
        ? 0
        : 1;

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
        ans14);

    new_obj = {
      ...tmp[3],
      attempted: true,
      completed: p === 0 ? false : true,
      disabled: false,
      totalQue: q,
      answered: q - p,
    };

    tmp.splice(3, 1, new_obj);

    let surveyAnswers = [...answersArrTmp];
    let payload = {};

    if (answersArrTmp.length > 0) {
      let new_obj1 = {pastStudent: answers};
      let index;
      surveyAnswers.some(function (entry, i) {
        if (entry?.pastStudent) {
          index = i;
        }
      });
      if (index != undefined) {
        surveyAnswers.splice(index, 1, new_obj1);
      } else {
        surveyAnswers.push({pastStudent: answers});
      }
    } else {
      surveyAnswers.push({pastStudent: answers});
    }
    payload = {
      ...store.currentSurveyData,
      currentSurveyStatus: tmp,
      surveyAnswers,
      updatedAt: new Date().toString(),
    };
    let tmp1 = FindAndUpdate(totalSurveys, payload);

    console.log('payload past student ', payload);
    dispatch({type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY, payload: payload});
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
    showModal();
  };

  const handleSelection = (answer, type) => {
    let tmp2 = [];
    if (type === 'still_associated_with_the_center_reasons') {
      tmp2 = [...answers.still_associated_with_the_center_reasons];
    }

    if (type === 'how_the_center_has_influnced_your_overall_personality') {
      tmp2 = [...answers.how_the_center_has_influnced_your_overall_personality];
    }
    if (type === 'reasons_for_change_in_your_personality') {
      tmp2 = [...answers.reasons_for_change_in_your_personality];
    }
    if (type === 'how_the_center_has_influnced_your_personality') {
      tmp2 = [...answers.how_the_center_has_influnced_your_personality];
    }
    if (
      type ===
      'experience_between_you_n_other_students_who_do_not_come_to_kendra'
    ) {
      tmp2 = [
        ...answers.experience_between_you_n_other_students_who_do_not_come_to_kendra,
      ];
    }

    if (type === 'difference_noticed_in_the_family_due_to_the_center') {
      tmp2 = [...answers.difference_noticed_in_the_family_due_to_the_center];
    }

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
    if (type === 'still_associated_with_the_center_reasons') {
      setAnswers({
        ...answers,
        still_associated_with_the_center_reasons: tmp2,
      });
    }

    if (type === 'how_the_center_has_influnced_your_overall_personality') {
      setAnswers({
        ...answers,
        how_the_center_has_influnced_your_overall_personality: tmp2,
      });
    }
    if (type === 'reasons_for_change_in_your_personality') {
      setAnswers({
        ...answers,
        reasons_for_change_in_your_personality: tmp2,
      });
    }
    if (type === 'how_the_center_has_influnced_your_personality') {
      setAnswers({
        ...answers,
        how_the_center_has_influnced_your_personality: tmp2,
      });
    }
    if (
      type ===
      'experience_between_you_n_other_students_who_do_not_come_to_kendra'
    ) {
      setAnswers({
        ...answers,
        experience_between_you_n_other_students_who_do_not_come_to_kendra: tmp2,
      });
    }
    if (type === 'difference_noticed_in_the_family_due_to_the_center') {
      setAnswers({
        ...answers,
        difference_noticed_in_the_family_due_to_the_center: tmp2,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header title={t('PAST_STUDENTS')} onPressBack={goBack} />
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
        {/* QA1 -  friends_coming_to_center_the_days*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.friends_coming_to_center_the_days
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
                  color: !answers.friends_coming_to_center_the_days
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
                {t('PAST_STUDENTS_Q2')}
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
              valueProp={answers.friends_coming_to_center_the_days}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  friends_coming_to_center_the_days: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA2 - is_the_center_same_as_before*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.is_the_center_same_as_before
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
                  color: !answers.is_the_center_same_as_before
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
                {t('PAST_STUDENTS_Q3')}
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
              valueProp={answers.is_the_center_same_as_before}
              onValueChange={item => {
                setAnswers({...answers, is_the_center_same_as_before: item});
              }}
            />
          </View>
        </View>

        {/* QA3- how_many_years_were_you_coming_to_the_center */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.how_many_years_were_you_coming_to_the_center
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
                  color: !answers.how_many_years_were_you_coming_to_the_center
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
                {t('PAST_STUDENTS_Q4')}
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
                value: 'less than 1 year',
                label: 'PAST_STUDENTS_Q4_OPT1',
              },
              {
                key: 2,
                value: '1 -3 years',
                label: 'PAST_STUDENTS_Q4_OPT2',
              },
              {
                key: 3,
                value: 'More than 3 years',
                label: 'PAST_STUDENTS_Q4_OPT3',
              },
            ]}
            valueProp={answers.how_many_years_were_you_coming_to_the_center}
            onValueChange={item => {
              setAnswers({
                ...answers,
                how_many_years_were_you_coming_to_the_center: item,
              });
            }}
          />
        </View>

        {/* QA4 - reason_for_leaving_the_center*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.reason_for_leaving_the_center ||
                  (answers.reason_for_leaving_the_center?.value === 'Others' &&
                    !answers.reason_for_leaving_the_center?.other)
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
                    !answers.reason_for_leaving_the_center ||
                    (answers.reason_for_leaving_the_center?.value ===
                      'Others' &&
                      !answers.reason_for_leaving_the_center?.other)
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
                {t('PAST_STUDENTS_Q5')}
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
                  value: 'Completion of education',
                  label: 'PAST_STUDENTS_Q5_OPT1',
                },
                {key: 2, value: 'Transfer', label: 'PAST_STUDENTS_Q5_OPT2'},

                {
                  key: 3,
                  value: 'Higher Studies ',
                  label: 'PAST_STUDENTS_Q5_OPT4',
                },
                {
                  key: 4,
                  value: 'Others',
                  label: 'PAST_STUDENTS_Q5_OPT3',
                },
              ]}
              valueProp={answers.reason_for_leaving_the_center}
              onValueChange={item => {
                setAnswers({...answers, reason_for_leaving_the_center: item});
              }}
            />
            {answers.reason_for_leaving_the_center?.key === 4 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    reason_for_leaving_the_center: {
                      ...answers.reason_for_leaving_the_center,
                      other: text,
                    },
                  });
                }}
                value={answers.reason_for_leaving_the_center?.other}
                empty={!answers.reason_for_leaving_the_center?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA5 -still_associated_with_the_center */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  // answers.still_associated_with_the_center?.value === 'Yes' &&
                  // answers.still_associated_with_the_center_reasons.length === 0
                  //   ? COLORS.red
                  //   : !answers.still_associated_with_the_center_reasons?.value
                  !answers.still_associated_with_the_center ||
                  (answers.still_associated_with_the_center?.value === 'Yes' &&
                    answers.still_associated_with_the_center_reasons.length ===
                      0)
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
                    !answers.still_associated_with_the_center ||
                    (answers.still_associated_with_the_center?.value ===
                      'Yes' &&
                      answers.still_associated_with_the_center_reasons
                        .length === 0)
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
                {t('PAST_STUDENTS_Q6')}
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
                  label: 'PAST_STUDENTS_Q6_OPT1',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'PAST_STUDENTS_Q6_OPT2',
                },
              ]}
              valueProp={answers.still_associated_with_the_center}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  still_associated_with_the_center: item,
                });
              }}
            />

            {answers.still_associated_with_the_center?.key === 1 && (
              <View style={{marginTop: 10}}>
                {[
                  {
                    key: 1,
                    value: 'Connected students',
                    label: 'PAST_STUDENTS_Q6_OPT1_A',
                  },
                  {
                    key: 2,
                    value: 'Provided financial resources',
                    label: 'PAST_STUDENTS_Q6_OPT1_B',
                  },
                  {
                    key: 3,
                    value: 'Participated in events',
                    label: 'PAST_STUDENTS_Q6_OPT1_C',
                  },
                  {
                    key: 4,
                    value: 'Provided other resources',
                    label: 'PAST_STUDENTS_Q6_OPT1_D',
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
                        handleSelection(
                          el,
                          'still_associated_with_the_center_reasons',
                        );
                      }}>
                      <Checkbox
                        status={
                          answers.still_associated_with_the_center_reasons.filter(
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
          </View>
        </View>

        {/* QA6 -  how_the_center_has_influnced_your_overall_personality*/}
        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.how_the_center_has_influnced_your_overall_personality
                    .length === 0
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
                    answers
                      .how_the_center_has_influnced_your_overall_personality
                      .length === 0
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
                {t('PAST_STUDENTS_Q10')}
              </TextHandler>
            </View>
          </View>
          {[
            {
              key: 1,
              value: 'Increased confidence and clarity on life goals',
              label: 'PAST_STUDENTS_Q10_OPT1',
            },
            {
              key: 2,
              value: 'Increased academic interest and performance',
              label: 'PAST_STUDENTS_Q10_OPT2',
            },
            {
              key: 3,
              value: 'Developed hidden qualities',
              label: 'PAST_STUDENTS_Q10_OPT3',
            },
            {
              key: 4,
              value: 'Instilled nationalism',
              label: 'PAST_STUDENTS_Q10_OPT4',
            },
            {
              key: 5,
              value: 'Good understanding of socio political issues',
              label: 'PAST_STUDENTS_Q10_OPT5',
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
                  handleSelection(
                    el,
                    'how_the_center_has_influnced_your_overall_personality',
                  );
                }}>
                <Checkbox
                  status={
                    answers.how_the_center_has_influnced_your_overall_personality.filter(
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
                    marginRight: 20,
                    // textAlign: 'left',
                  }}>
                  {t(el.label)}
                </TextHandler>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* QA7 - reasons_for_change_in_your_personality*/}
        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.reasons_for_change_in_your_personality.length === 0
                    ? //  checkarrayforOtherValues(
                      //   answers.reasons_for_change_in_your_personality,
                      //   'other',
                      // // ) === 0
                      // 1
                      //  : 0
                      // answers.reasons_for_change_in_your_personality.length === 0 ||
                      // checkarrayforOtherValues(
                      //   answers.reasons_for_change_in_your_personality,
                      //   'other',
                      // ) === 0
                      COLORS.red
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
                    answers.reasons_for_change_in_your_personality.length === 0
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
                {t('PAST_STUDENTS_Q7_NEW')}
              </TextHandler>
            </View>
          </View>
          {[
            {
              key: 1,
              value: 'Good teachers',
              label: 'PAST_STUDENTS_Q7_NEW_OPT1',
            },
            {
              key: 2,
              value: 'Participatory teaching methods',
              label: 'PAST_STUDENTS_Q7_NEW_OPT2',
            },
            {
              key: 3,
              value: 'Inputs from Various lectures/ baudhik/ shibir',
              label: 'PAST_STUDENTS_Q7_NEW_OPT3',
            },
            {
              key: 4,
              value: 'Opportunity to participate in and conduct events',
              label: 'PAST_STUDENTS_Q7_NEW_OPT4',
            },
            {
              key: 5,
              value: 'Others',
              label: 'PAST_STUDENTS_Q7_NEW_OPT5',
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
                  handleSelection(el, 'reasons_for_change_in_your_personality');
                }}>
                <Checkbox
                  status={
                    answers.reasons_for_change_in_your_personality.filter(
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
                    marginRight: 20,
                    // textAlign: 'left',
                  }}>
                  {t(el.label)}
                </TextHandler>
              </TouchableOpacity>
            );
          })}
          {answers.reasons_for_change_in_your_personality.filter(
            item => item.key === 5,
          ).length > 0 && (
            <Input
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                let tmp = [...answers.reasons_for_change_in_your_personality];
                tmp.forEach((el, index) => {
                  if (el.key === 4) {
                    let newans = {...el, other: text};
                    tmp.splice(index, 1, newans);
                  }
                });
                setAnswers({
                  ...answers,
                  reasons_for_change_in_your_personality: tmp,
                });
              }}
              value={
                answers.reasons_for_change_in_your_personality.filter(
                  el => el.key === 5,
                ).length > 0
                  ? answers.reasons_for_change_in_your_personality.filter(
                      el => el.key === 5,
                    )[0]?.['other']
                  : ''
              }
              empty={
                !answers.reasons_for_change_in_your_personality.filter(
                  el => el.key === 5,
                )[0]?.['other']
              }
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          )}
        </View>

        {/* QA8 - encourage_other_students_join_the_center*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.encourage_other_students_join_the_center.length === 0
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
                    answers.encourage_other_students_join_the_center.length ===
                    0
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
                {t('PAST_STUDENTS_Q9')}
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
              valueProp={answers.encourage_other_students_join_the_center}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  encourage_other_students_join_the_center: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA9 - how_the_center_has_influnced_your_personality*/}
        <View style={{marginTop: 10}}>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.how_the_center_has_influnced_your_personality
                    .length === 0 ||
                  checkarrayforOtherValues(
                    answers.how_the_center_has_influnced_your_personality,
                    'other',
                  ) === 0
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
                    answers.how_the_center_has_influnced_your_personality
                      .length === 0 ||
                    checkarrayforOtherValues(
                      answers.how_the_center_has_influnced_your_personality,
                      'other',
                    ) === 0
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
                {t('PAST_STUDENTS_Q10')}
              </TextHandler>
            </View>
          </View>
          {[
            {
              key: 1,
              value: 'Courage development',
              label: 'PAST_STUDENTS_Q9_OPT1_NEW',
            },
            {
              key: 2,
              value: 'Better interacting with people',
              label: 'PAST_STUDENTS_Q9_OPT2_NEW',
            },
            {
              key: 3,
              value: 'Good habits',
              label: 'PAST_STUDENTS_Q9_OPT3_NEW',
            },
            {
              key: 4,
              value: 'Other',
              label: 'PAST_STUDENTS_Q9_OPT4_NEW',
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
                  handleSelection(
                    el,
                    'how_the_center_has_influnced_your_personality',
                  );
                }}>
                <Checkbox
                  status={
                    answers.how_the_center_has_influnced_your_personality.filter(
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
                    marginRight: 20,
                    // textAlign: 'left',
                  }}>
                  {t(el.label)}
                </TextHandler>
              </TouchableOpacity>
            );
          })}
          {answers.how_the_center_has_influnced_your_personality.filter(
            item => item.key === 4,
          ).length > 0 && (
            <Input
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                let tmp = [
                  ...answers.how_the_center_has_influnced_your_personality,
                ];
                tmp.forEach((el, index) => {
                  if (el.key === 4) {
                    let newans = {...el, other: text};
                    tmp.splice(index, 1, newans);
                  }
                });
                setAnswers({
                  ...answers,
                  how_the_center_has_influnced_your_personality: tmp,
                });
              }}
              value={
                answers.how_the_center_has_influnced_your_personality.filter(
                  el => el.key === 4,
                ).length > 0
                  ? answers.how_the_center_has_influnced_your_personality.filter(
                      el => el.key === 4,
                    )[0]?.['other']
                  : ''
              }
              empty={
                !answers.how_the_center_has_influnced_your_personality.filter(
                  el => el.key === 4,
                )[0]?.['other']
              }
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          )}
        </View>

        {/* QA10 - experience_between_you_n_other_students_who_do_not_come_to_kendra*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers
                    .experience_between_you_n_other_students_who_do_not_come_to_kendra
                    .length === 0 ||
                  checkarrayforOtherValues(
                    answers.experience_between_you_n_other_students_who_do_not_come_to_kendra,
                    'other',
                  ) === 0
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
                    answers
                      .experience_between_you_n_other_students_who_do_not_come_to_kendra
                      .length === 0 ||
                    checkarrayforOtherValues(
                      answers.experience_between_you_n_other_students_who_do_not_come_to_kendra,
                      'other',
                    ) === 0
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
                {t('PAST_STUDENTS_Q12')}
              </TextHandler>
            </View>
          </View>

          {/* new */}
          {[
            {
              key: 1,
              value: 'Good education',
              label: 'PAST_STUDENTS_Q12_OPT1',
            },
            {
              key: 2,
              value: 'Improved social status',
              label: 'PAST_STUDENTS_Q12_OPT2',
            },
            {
              key: 3,
              value: 'Improved financial status',
              label: 'PAST_STUDENTS_Q12_OPT3',
            },
            {
              key: 4,
              value: 'Increase in social and cultural awareness',
              label: 'PAST_STUDENTS_Q12_OPT4',
            },
            {
              key: 5,
              value: 'Other',
              label: 'PAST_STUDENTS_Q12_OPT5',
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
                  handleSelection(
                    el,
                    'experience_between_you_n_other_students_who_do_not_come_to_kendra',
                  );
                }}>
                <Checkbox
                  status={
                    answers.experience_between_you_n_other_students_who_do_not_come_to_kendra.filter(
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
                    marginRight: 20,
                    // textAlign: 'left',
                  }}>
                  {t(el.label)}
                </TextHandler>
              </TouchableOpacity>
            );
          })}
          {answers.experience_between_you_n_other_students_who_do_not_come_to_kendra.filter(
            item => item.key === 5,
          ).length > 0 && (
            <Input
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                let tmp = [
                  ...answers.experience_between_you_n_other_students_who_do_not_come_to_kendra,
                ];
                tmp.forEach((el, index) => {
                  if (el.key === 5) {
                    let newans = {...el, other: text};
                    tmp.splice(index, 1, newans);
                  }
                });
                setAnswers({
                  ...answers,
                  experience_between_you_n_other_students_who_do_not_come_to_kendra:
                    tmp,
                });
              }}
              value={
                answers.experience_between_you_n_other_students_who_do_not_come_to_kendra.filter(
                  el => el.key === 5,
                ).length > 0
                  ? answers.experience_between_you_n_other_students_who_do_not_come_to_kendra.filter(
                      el => el.key === 5,
                    )[0]?.['other']
                  : ''
              }
              empty={
                !answers
                  .experience_between_you_n_other_students_who_do_not_come_to_kendra
                  ?.other
              }
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          )}
        </View>

        {/* QA11 - difference_noticed_in_the_family_due_to_the_center */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.difference_noticed_in_the_family_due_to_the_center
                    .length === 0 ||
                  checkarrayforOtherValues(
                    answers.difference_noticed_in_the_family_due_to_the_center,
                    'other',
                  ) === 0
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
                    answers.difference_noticed_in_the_family_due_to_the_center
                      .length === 0 ||
                    checkarrayforOtherValues(
                      answers.difference_noticed_in_the_family_due_to_the_center,
                      'other',
                    ) === 0
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
                {t('PAST_STUDENTS_Q13')}
              </TextHandler>
            </View>
          </View>

          <View>
            {/* new */}
            {[
              {
                key: 1,
                value: 'Improved respect',
                label: 'PAST_STUDENTS_Q13_OPT1',
              },
              {
                key: 2,
                value: 'Changed Habits',
                label: 'PAST_STUDENTS_Q13_OPT2',
              },
              {
                key: 3,
                value: 'Disciplined',
                label: 'PAST_STUDENTS_Q13_OPT3',
              },
              {
                key: 4,
                value: 'Family bonding',
                label: 'PAST_STUDENTS_Q13_OPT4',
              },
              {
                key: 5,
                value: 'Other',
                label: 'PAST_STUDENTS_Q13_OPT5',
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
                    handleSelection(
                      el,
                      'difference_noticed_in_the_family_due_to_the_center',
                    );
                  }}>
                  <Checkbox
                    status={
                      answers.difference_noticed_in_the_family_due_to_the_center.filter(
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
                      marginRight: 20,
                      // textAlign: 'left',
                    }}>
                    {t(el.label)}
                  </TextHandler>
                </TouchableOpacity>
              );
            })}
            {answers.difference_noticed_in_the_family_due_to_the_center.filter(
              item => item.key === 5,
            ).length > 0 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  let tmp = [
                    ...answers.difference_noticed_in_the_family_due_to_the_center,
                  ];
                  tmp.forEach((el, index) => {
                    if (el.key === 5) {
                      let newans = {...el, other: text};
                      tmp.splice(index, 1, newans);
                    }
                  });
                  setAnswers({
                    ...answers,
                    difference_noticed_in_the_family_due_to_the_center: tmp,
                  });
                }}
                value={
                  answers.difference_noticed_in_the_family_due_to_the_center.filter(
                    el => el.key === 5,
                  ).length > 0
                    ? answers.difference_noticed_in_the_family_due_to_the_center.filter(
                        el => el.key === 5,
                      )[0]?.['other']
                    : ''
                }
                empty={
                  !answers.difference_noticed_in_the_family_due_to_the_center.filter(
                    el => el.key === 5,
                  )[0]?.['other']
                }
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.25,
                }}
              />
            )}
          </View>
        </View>

        {/* QA12 - contribute_in_betterment_of_the_center */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.contribute_in_betterment_of_the_center ||
                  (answers.contribute_in_betterment_of_the_center?.value ===
                    'Other' &&
                    !answers.contribute_in_betterment_of_the_center?.other)
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
                    !answers.contribute_in_betterment_of_the_center ||
                    (answers.contribute_in_betterment_of_the_center?.value ===
                      'Other' &&
                      !answers.contribute_in_betterment_of_the_center?.other)
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
                {t('PAST_STUDENTS_Q14')}
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
                  value: 'Donating time  ',
                  label: 'PAST_STUDENTS_Q14_OPT1',
                },
                {
                  key: 2,
                  value: 'Financial help',
                  label: 'PAST_STUDENTS_Q14_OPT2',
                },
                {
                  key: 3,
                  value: 'Connecting Experts',
                  label: 'PAST_STUDENTS_Q14_OPT3',
                },
                {
                  key: 4,
                  value: 'Other',
                  label: 'PAST_STUDENTS_Q14_OPT4',
                },
              ]}
              valueProp={answers.contribute_in_betterment_of_the_center}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  contribute_in_betterment_of_the_center: item,
                });
              }}
            />
            {answers.contribute_in_betterment_of_the_center?.key === 4 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    contribute_in_betterment_of_the_center: {
                      ...answers.contribute_in_betterment_of_the_center,
                      other: text,
                    },
                  });
                }}
                value={answers.contribute_in_betterment_of_the_center?.other}
                empty={!answers.contribute_in_betterment_of_the_center?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA13 - connected_with_sangh_organizations*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.connected_with_sangh_organizations
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
                  color: !answers.connected_with_sangh_organizations
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
                {t('PAST_STUDENTS_Q15')}
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
                  value: 'Regularly go to shakha',
                  label: 'PAST_STUDENTS_Q15_OPT1',
                },
                {
                  key: 2,
                  value: 'Have sangh Dayitva ',
                  label: 'PAST_STUDENTS_Q15_OPT2',
                },
                {
                  key: 3,
                  value:
                    'Connected with other Sanghatan of RSS (BMS, Kalyan Ashram etc)',
                  label: 'PAST_STUDENTS_Q15_OPT3',
                },
                {
                  key: 4,
                  value: 'Not connected',
                  label: 'PAST_STUDENTS_Q15_OPT4',
                },
              ]}
              valueProp={answers.connected_with_sangh_organizations}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  connected_with_sangh_organizations: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA14 - involved_in_any_othe_social_activities*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.involved_in_any_othe_social_activities ||
                  (answers.involved_in_any_othe_social_activities?.value ===
                    'Yes' &&
                    !answers.involved_in_any_othe_social_activities?.other)
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
                    !answers.involved_in_any_othe_social_activities ||
                    (answers.involved_in_any_othe_social_activities?.value ===
                      'Yes' &&
                      !answers.involved_in_any_othe_social_activities?.other)
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
                {t('PAST_STUDENTS_Q16')}
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
                  label: 'PAST_STUDENTS_Q16_OPT1',
                },

                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={answers.involved_in_any_othe_social_activities}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  involved_in_any_othe_social_activities: item,
                });
              }}
            />
            {answers.involved_in_any_othe_social_activities?.key === 1 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    involved_in_any_othe_social_activities: {
                      ...answers.involved_in_any_othe_social_activities,
                      other: text,
                    },
                  });
                }}
                value={answers.involved_in_any_othe_social_activities?.other}
                empty={!answers.involved_in_any_othe_social_activities?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
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
