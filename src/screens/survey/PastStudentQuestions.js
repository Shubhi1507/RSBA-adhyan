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

export default function PastStudentQuestions() {
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const {t} = useContext(LocalizationContext);

  const dispatch = useDispatch();
  let [answers, setAnswers] = useState({
    year_were_you_associated_with_the_center: '',
    friends_coming_to_center_the_days: '',
    is_the_center_same_as_before: '',
    how_many_years_were_you_coming_to_the_center: '',
    reason_for_leaving_the_center: '',
    still_associated_with_the_center: '',
    how_the_center_has_influnced_your_results_n_behavior: '',
    how_the_center_has_influnced_your_behavior: '',
    encourage_other_students_join_the_center: '',
    how_the_center_has_influnced_your_personality: '',
    experience_between_you_n_other_students_who_do_not_come_to_kendra: '',
    difference_experienced_between_you_n_other_elder_students_due_to_the_center:
      '',
    difference_noticed_in_the_family_due_to_the_center: '',
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
        setAnswers(entry.pastStudent);
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
    const {
      year_were_you_associated_with_the_center,
      friends_coming_to_center_the_days,
      is_the_center_same_as_before,
      how_many_years_were_you_coming_to_the_center,
      reason_for_leaving_the_center,
      still_associated_with_the_center,
      connected_with_sangh_organizations,
      contribute_in_betterment_of_the_center,
      difference_experienced_between_you_n_other_elder_students_due_to_the_center,
      difference_noticed_in_the_family_due_to_the_center,
      encourage_other_students_join_the_center,
      experience_between_you_n_other_students_who_do_not_come_to_kendra,
      how_the_center_has_influnced_your_behavior,
      how_the_center_has_influnced_your_personality,
      how_the_center_has_influnced_your_results_n_behavior,
      involved_in_any_othe_social_activities,
    } = answers;
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

    console.log(p, '/', q);
    if (
      !year_were_you_associated_with_the_center ||
      !friends_coming_to_center_the_days ||
      !is_the_center_same_as_before ||
      !how_many_years_were_you_coming_to_the_center ||
      !reason_for_leaving_the_center ||
      !still_associated_with_the_center ||
      connected_with_sangh_organizations ||
      !contribute_in_betterment_of_the_center ||
      !difference_experienced_between_you_n_other_elder_students_due_to_the_center ||
      !difference_noticed_in_the_family_due_to_the_center ||
      !encourage_other_students_join_the_center ||
      !experience_between_you_n_other_students_who_do_not_come_to_kendra ||
      !how_the_center_has_influnced_your_behavior ||
      !how_the_center_has_influnced_your_personality ||
      !how_the_center_has_influnced_your_results_n_behavior ||
      !involved_in_any_othe_social_activities
    ) {
      console.log('false', answers);
      new_obj = {
        ...tmp[3],
        attempted: true,
        completed: false,
        disabled: false,
        totalQue: q,
        answered: p,
      };
    } else {
      new_obj = {
        ...tmp[3],
        attempted: true,
        completed: true,
        disabled: true,
        totalQue: q,
        answered: p,
      };
    }
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
                {t('PAST_STUDENTS_Q1')}
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
                year_were_you_associated_with_the_center: text,
              });
            }}
            value={answers.year_were_you_associated_with_the_center}
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
                  value: 'Others',
                  label: 'PAST_STUDENTS_Q5_OPT3',
                },
              ]}
              valueProp={answers.reason_for_leaving_the_center}
              onValueChange={item => {
                setAnswers({...answers, reason_for_leaving_the_center: item});
              }}
            />
            {answers.reason_for_leaving_the_center?.key === 3 && (
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
            <Input
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  still_associated_with_the_center: {
                    ...answers.still_associated_with_the_center,
                    other: text,
                  },
                });
              }}
              value={answers.still_associated_with_the_center?.other}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        {/* QA7 */}
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
                {t('PAST_STUDENTS_Q7')}
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
                  value: 'No change/ increase/decrease',
                  label: 'PAST_STUDENTS_Q7_OPT1',
                },
                {
                  key: 2,
                  value:
                    'Reasons (good teachers/ teaching methodology/ atomsphere/ other',
                  label: 'PAST_STUDENTS_Q7_OPT2',
                },
              ]}
              valueProp={
                answers.how_the_center_has_influnced_your_results_n_behavior
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  how_the_center_has_influnced_your_results_n_behavior: item,
                });
              }}
            />
            {answers.how_the_center_has_influnced_your_results_n_behavior
              ?.key === 2 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    how_the_center_has_influnced_your_results_n_behavior: {
                      ...answers.how_the_center_has_influnced_your_results_n_behavior,
                      other: text,
                    },
                  });
                }}
                value={
                  answers.how_the_center_has_influnced_your_results_n_behavior
                    ?.other
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

        {/* QA8*/}
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
                {t('PAST_STUDENTS_Q8')}
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
                  value: 'No specific influnce',
                  label: 'PAST_STUDENTS_Q8_OPT1',
                },
                {
                  key: 2,
                  value: 'Improved behavior',
                  label: 'PAST_STUDENTS_Q8_OPT2',
                },
                {
                  key: 3,
                  value: 'Other',
                  label: 'PAST_STUDENTS_Q8_OPT3',
                },
              ]}
              valueProp={answers.how_the_center_has_influnced_your_behavior}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  how_the_center_has_influnced_your_behavior: item,
                });
              }}
            />
            {answers.how_the_center_has_influnced_your_behavior?.key === 3 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    how_the_center_has_influnced_your_behavior: {
                      ...answers.how_the_center_has_influnced_your_behavior,
                      other: text,
                    },
                  });
                }}
                value={
                  answers.how_the_center_has_influnced_your_behavior?.other
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

        {/* QA9 */}
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

        {/* QA10*/}
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
                {t('PAST_STUDENTS_Q10')}
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
                  value: 'Courage development',
                  label: 'PAST_STUDENTS_Q10_OPT1',
                },
                {
                  key: 2,
                  value: 'Better interacting with people',
                  label: 'PAST_STUDENTS_Q10_OPT2',
                },
                {
                  key: 3,
                  value: 'Good habits',
                  label: 'PAST_STUDENTS_Q10_OPT3',
                },
                {
                  key: 4,
                  value: 'Other',
                  label: 'PAST_STUDENTS_Q10_OPT4',
                },
              ]}
              valueProp={answers.how_the_center_has_influnced_your_personality}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  how_the_center_has_influnced_your_personality: item,
                });
              }}
            />
            {answers.how_the_center_has_influnced_your_personality?.key ===
              4 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    how_the_center_has_influnced_your_personality: {
                      ...answers.how_the_center_has_influnced_your_personality,
                      other: text,
                    },
                  });
                }}
                value={
                  answers.how_the_center_has_influnced_your_personality?.other
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

        {/* QA11 */}
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
                {t('PAST_STUDENTS_Q11')}
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
                  value: 'Good education',
                  label: 'PAST_STUDENTS_Q11_OPT1',
                },
                {
                  key: 2,
                  value: 'Improved social status',
                  label: 'PAST_STUDENTS_Q11_OPT2',
                },
                {
                  key: 3,
                  value: 'Improved financial status',
                  label: 'PAST_STUDENTS_Q11_OPT3',
                },
                {
                  key: 4,
                  value: 'Other',
                  label: 'PAST_STUDENTS_Q11_OPT4',
                },
              ]}
              valueProp={
                answers.experience_between_you_n_other_students_who_do_not_come_to_kendra
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  experience_between_you_n_other_students_who_do_not_come_to_kendra:
                    item,
                });
              }}
            />
            {answers
              .experience_between_you_n_other_students_who_do_not_come_to_kendra
              ?.key === 4 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    experience_between_you_n_other_students_who_do_not_come_to_kendra:
                      {
                        ...answers.experience_between_you_n_other_students_who_do_not_come_to_kendra,
                        other: text,
                      },
                  });
                }}
                value={
                  answers
                    .experience_between_you_n_other_students_who_do_not_come_to_kendra
                    ?.other
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

        {/* QA12*/}
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
                {t('PAST_STUDENTS_Q12')}
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
                  value: 'Courage development',
                  label: 'PAST_STUDENTS_Q12_OPT1',
                },
                {
                  key: 2,
                  value: 'Better interacting with people',
                  label: 'PAST_STUDENTS_Q12_OPT2',
                },
                {
                  key: 3,
                  value: 'Good habits',
                  label: 'PAST_STUDENTS_Q12_OPT3',
                },
                {
                  key: 4,
                  value: 'Other',
                  label: 'PAST_STUDENTS_Q12_OPT4',
                },
              ]}
              valueProp={
                answers.difference_experienced_between_you_n_other_elder_students_due_to_the_center
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  difference_experienced_between_you_n_other_elder_students_due_to_the_center:
                    item,
                });
              }}
            />
            {answers
              .difference_experienced_between_you_n_other_elder_students_due_to_the_center
              ?.key === 4 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    difference_experienced_between_you_n_other_elder_students_due_to_the_center:
                      {
                        ...answers.difference_experienced_between_you_n_other_elder_students_due_to_the_center,
                        other: text,
                      },
                  });
                }}
                value={
                  answers
                    .difference_experienced_between_you_n_other_elder_students_due_to_the_center
                    ?.other
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

        {/* QA13*/}
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
                {t('PAST_STUDENTS_Q13')}
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
                  value: 'Organised',
                  label: 'PAST_STUDENTS_Q13_OPT3',
                },
                {
                  key: 4,
                  value: 'Other',
                  label: 'PAST_STUDENTS_Q10_OPT4',
                },
              ]}
              valueProp={
                answers.difference_noticed_in_the_family_due_to_the_center
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  difference_noticed_in_the_family_due_to_the_center: item,
                });
              }}
            />
            {answers.difference_noticed_in_the_family_due_to_the_center?.key ===
              4 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    difference_noticed_in_the_family_due_to_the_center: {
                      ...answers.difference_noticed_in_the_family_due_to_the_center,
                      other: text,
                    },
                  });
                }}
                value={
                  answers.difference_noticed_in_the_family_due_to_the_center
                    ?.other
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

        {/* QA14*/}
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
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
          </View>
        </View>

        {/* QA15*/}
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

        {/* QA16*/}
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
                  value: 'Yes (Enter short description)',
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
});
