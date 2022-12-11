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

export default function KendraSanchalakQuestions() {
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);

  const dispatch = useDispatch();
  let totalSurveys = store.totalSurveys;
  const [checked, setChecked] = React.useState(false);

  let [answers, setAnswers] = useState({
    total_students_attend_the_class_regularly: '',
    was_the_kendra_able_to_perform_during_the_covid: '',
    difference_observed_in_the_families_of_students_coming_to_kendra: [],
    families_from_the_locality_have_influenced_due_to_our_kendra_activities: '',
    percentage_of_decline_in_school_dropout_due_to_kendra: '',
    conduct_medical_test_for_students: '',
    plan_for_expansion: '',
    submit_status_report_of_kendra_to_all_the_stakeholders_each_month: '',
    feedback_mechanism_to_address_issues: '',
    observation_not_covered: '',
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
      if (entry?.kendraSanchalak) {
        setAnswers(entry.kendraSanchalak);
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
      total_students_attend_the_class_regularly,
      was_the_kendra_able_to_perform_during_the_covid,
      difference_observed_in_the_families_of_students_coming_to_kendra,
      families_from_the_locality_have_influenced_due_to_our_kendra_activities,
      percentage_of_decline_in_school_dropout_due_to_kendra,
      conduct_medical_test_for_students,
      feedback_mechanism_to_address_issues,
      observation_not_covered,
      plan_for_expansion,
      submit_status_report_of_kendra_to_all_the_stakeholders_each_month,
    } = answers;
    let q = 10;
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
      !total_students_attend_the_class_regularly ||
      !was_the_kendra_able_to_perform_during_the_covid ||
      difference_observed_in_the_families_of_students_coming_to_kendra.length ===
        0 ||
      !families_from_the_locality_have_influenced_due_to_our_kendra_activities ||
      !percentage_of_decline_in_school_dropout_due_to_kendra ||
      !conduct_medical_test_for_students ||
      !feedback_mechanism_to_address_issues ||
      !observation_not_covered ||
      !plan_for_expansion ||
      !submit_status_report_of_kendra_to_all_the_stakeholders_each_month
    ) {
      new_obj = {
        ...tmp[5],
        attempted: true,
        completed: false,
        disabled: false,
        totalQue: q,
        answered: p,
      };
    } else {
      new_obj = {
        ...tmp[5],
        attempted: true,
        completed: true,
        disabled: true,
        totalQue: q,
        answered: p,
      };
    }
    tmp.splice(5, 1, new_obj);

    let surveyAnswers = [...answersArrTmp];
    let payload = {};

    if (answersArrTmp.length > 0) {
      let new_obj1 = {kendraSanchalak: answers};
      let index;
      surveyAnswers.some(function (entry, i) {
        if (entry?.kendraSanchalak) {
          index = i;
        }
      });
      if (index != undefined) {
        surveyAnswers.splice(index, 1, new_obj1);
      } else {
        surveyAnswers.push({kendraSanchalak: answers});
      }
    } else {
      surveyAnswers.push({kendraSanchalak: answers});
    }
    payload = {
      ...store.currentSurveyData,
      currentSurveyStatus: tmp,
      surveyAnswers,
      updatedAt: new Date().toString(),
    };

    let tmp1 = FindAndUpdate(totalSurveys, payload);

    console.log('payload kendraSanchalak ', payload);
    dispatch({type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY, payload: payload});
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
    showModal();
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header title={t('KENDRA_SANCHALAK')} onPressBack={goBack} />
      </View>
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <SurveyCompletedModal
        visible={visible}
        hideModal={hideModal}
        onClick={pageNavigator}
      />

      <KeyboardAwareScrollView
        style={{flex: 1, paddingHorizontal: 20, flexGrow: 1}}>
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
              <TextHandler style={styles.question}>
                {t('KENDRA_SANCHALAK_Q1')}
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
                total_students_attend_the_class_regularly: text,
              });
            }}
            value={answers.total_students_attend_the_class_regularly}
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
                {t('KENDRA_SANCHALAK_Q2')}
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
                  value: 'No, absolutely closed',
                  label: 'KENDRA_SANCHALAK_Q2_OPT1',
                },
                {
                  key: 2,
                  value: 'Partially active (50 % of total 1.5 yrs)',
                  label: 'KENDRA_SANCHALAK_Q2_OPT2',
                },
                {
                  key: 3,
                  value:
                    'Partially active (Less than 10 % of total 1.5 yrs)"} ',
                  label: 'KENDRA_SANCHALAK_Q2_OPT3',
                },
                {
                  key: 4,
                  value: 'Fully active with 100 % capacity',
                  label: 'KENDRA_SANCHALAK_Q2_OPT4',
                },
              ]}
              valueProp={
                answers.was_the_kendra_able_to_perform_during_the_covid
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  was_the_kendra_able_to_perform_during_the_covid: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA3 */}
        <View style={{flex: 1, marginVertical: 20}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              marginVertical: 20,
            }}>
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
                {t('KENDRA_SANCHALAK_Q3')}
              </TextHandler>
            </View>
          </View>
          <View style={{flex: 1, flexGrow: 1}}>
            {[
              {
                key: 1,
                value: 'Family members willing to attends kendra activities',
                label: 'KENDRA_SANCHALAK_Q3_OPT1',
              },
              {
                key: 2,
                value: 'Siblings have joined our Kendra',
                label: 'KENDRA_SANCHALAK_Q3_OPT2',
              },
              {
                key: 3,
                value: 'Parents feels proud about Kendra students',
                label: 'KENDRA_SANCHALAK_Q3_OPT3',
              },
              {
                key: 4,
                value: 'None of the above',
                label: 'KENDRA_SANCHALAK_Q3_OPT4',
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
                      ...answers.difference_observed_in_the_families_of_students_coming_to_kendra,
                    ];
                    if (el.key === 4) {
                      tmp = [];
                      tmp.push(el);
                      setAnswers({
                        ...answers,
                        difference_observed_in_the_families_of_students_coming_to_kendra:
                          tmp,
                      });
                    } else {
                      if (tmp.length > 0) {
                        let j = tmp.filter(element => element.key === 4);
                        if (j.length > 0) {
                          tmp = [];
                          tmp.push(el);
                          setAnswers({
                            ...answers,
                            difference_observed_in_the_families_of_students_coming_to_kendra:
                              tmp,
                          });
                        } else {
                          tmp.forEach(function (item, index1) {
                            if (item.value === el.value) {
                              let tmp = [
                                ...answers.difference_observed_in_the_families_of_students_coming_to_kendra,
                              ];
                              tmp.splice(index1, 1);
                              setAnswers({
                                ...answers,
                                difference_observed_in_the_families_of_students_coming_to_kendra:
                                  tmp,
                              });
                            } else {
                              let tmp = [
                                ...answers.difference_observed_in_the_families_of_students_coming_to_kendra,
                              ];
                              tmp.push(el);
                              setAnswers({
                                ...answers,
                                difference_observed_in_the_families_of_students_coming_to_kendra:
                                  tmp,
                              });
                            }
                          });
                        }
                      } else {
                        tmp.push(el);
                        setAnswers({
                          ...answers,
                          difference_observed_in_the_families_of_students_coming_to_kendra:
                            tmp,
                        });
                      }
                    }
                  }}>
                  <Checkbox
                    status={
                      answers.difference_observed_in_the_families_of_students_coming_to_kendra.filter(
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
              <TextHandler style={styles.question}>
                {t('KENDRA_SANCHALAK_Q4')}
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
                  value: '10 to 15% ',
                  label: 'KENDRA_SANCHALAK_Q4_OPT1',
                },
                {
                  key: 2,
                  value: '16 to 30% ',
                  label: 'KENDRA_SANCHALAK_Q4_OPT2',
                },
                {
                  key: 3,
                  value: '31 to 45%',
                  label: 'KENDRA_SANCHALAK_Q4_OPT3',
                },
                {
                  key: 4,
                  value: 'above 50%',
                  label: 'KENDRA_SANCHALAK_Q4_OPT4',
                },
              ]}
              valueProp={
                answers.families_from_the_locality_have_influenced_due_to_our_kendra_activities
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  families_from_the_locality_have_influenced_due_to_our_kendra_activities:
                    item,
                });
              }}
            />
          </View>
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
              <TextHandler style={styles.question}>
                {t('KENDRA_SANCHALAK_Q5')}
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
                {key: 1, value: '10 to 15%', label: 'KENDRA_SANCHALAK_Q5_OPT1'},
                {key: 2, value: '16 to 30%', label: 'KENDRA_SANCHALAK_Q5_OPT2'},
                {key: 3, value: '31 to 45%', label: 'KENDRA_SANCHALAK_Q5_OPT3'},
                {key: 4, value: 'above 50%', label: 'KENDRA_SANCHALAK_Q5_OPT4'},
              ]}
              valueProp={
                answers.percentage_of_decline_in_school_dropout_due_to_kendra
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  percentage_of_decline_in_school_dropout_due_to_kendra: item,
                });
              }}
            />
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
              <TextHandler style={styles.question}>
                {t('KENDRA_SANCHALAK_Q6')}
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
              valueProp={answers.conduct_medical_test_for_students}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  conduct_medical_test_for_students: item,
                });
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
              <TextHandler style={styles.question}>
                {t('KENDRA_SANCHALAK_Q7')}
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
              valueProp={answers.plan_for_expansion}
              onValueChange={item => {
                setAnswers({...answers, plan_for_expansion: item});
              }}
            />
          </View>
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
              <TextHandler style={styles.question}>
                {t('KENDRA_SANCHALAK_Q8')}
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
              valueProp={
                answers.submit_status_report_of_kendra_to_all_the_stakeholders_each_month
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  submit_status_report_of_kendra_to_all_the_stakeholders_each_month:
                    item,
                });
              }}
            />
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
              <TextHandler style={styles.question}>
                {t('KENDRA_SANCHALAK_Q9')}
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
              valueProp={answers.feedback_mechanism_to_address_issues}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  feedback_mechanism_to_address_issues: item,
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
              <TextHandler style={styles.question}>
                {t('KENDRA_SANCHALAK_Q10')}
              </TextHandler>
            </View>
          </View>

          <View>
            <Input
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, observation_not_covered: text});
              }}
              value={answers.observation_not_covered}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
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
