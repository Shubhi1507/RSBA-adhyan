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

export default function PastStudentParentsScreen() {
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const {t} = useContext(LocalizationContext);

  const dispatch = useDispatch();
  let [answers, setAnswers] = useState({
    // doc
    no_of_parents_present: 0,
    educational_background: '',
    economic_status: '',
    reason_for_sending_children_to_the_centre: '',
    how_these_children_go_to_the_centre: '',
    days_children_are_going_to_the_centre: '',
    children_occupation_nowadays: '',
    how_centre_was_helpful_in_the_development: '',
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

  useEffect(() => {
    console.log('answersArrTmp', answersArrTmp);
    answersArrTmp.some(function (entry, i) {
      if (entry?.pastStudentParent) {
        setAnswers(entry.pastStudentParent);
      }
    });
  }, []);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const pageValidator = () => {
    let tmp = store?.currentSurveyData.currentSurveyStatus;
    console.log('original capture', tmp);
    let new_obj;
    const {
      children_occupation_nowadays,
      contribution_in_running_centre_more_effectively,
      days_children_are_going_to_the_centre,
      economic_status,
      educational_background,
      expectations_from_the_centre,
      how_centre_was_helpful_in_the_development,
      how_these_children_go_to_the_centre,
      involvement_in_the_programs_of_the_centre,
      no_of_parents_present,
      reason_for_sending_children_to_the_centre,
    } = answers;
    let q = 11;
    let p = Object.values(answers).filter(el => {
      if (el != '' || el != null || el != undefined) return el;
    }).length;
    console.log(p, '/', q);
    if (
      children_occupation_nowadays ||
      contribution_in_running_centre_more_effectively ||
      days_children_are_going_to_the_centre ||
      economic_status ||
      educational_background ||
      expectations_from_the_centre ||
      how_centre_was_helpful_in_the_development ||
      how_these_children_go_to_the_centre ||
      involvement_in_the_programs_of_the_centre ||
      no_of_parents_present ||
      reason_for_sending_children_to_the_centre
    ) {
      new_obj = {
        ...tmp[1],
        attempted: true,
        completed: false,
        disabled: false,
        totalQue: q,
        answered: p,
      };
    } else {
      new_obj = {
        ...tmp[1],
        attempted: true,
        completed: true,
        disabled: true,
        totalQue: q,
        answered: p,
      };
    }
    tmp.splice(1, 1, new_obj);
    console.log('original capture', tmp);


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
        <Header title={t('PAST_STUDENTS_PARENTS')} onPressBack={goBack} />
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
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        {/* QA2 - ok - educational_background */}
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
                {t('PAST_STUDENTS_PARENTS_Q1')}
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
              ]}
              valueProp={answers.educational_background}
              onValueChange={item => {
                setAnswers({...answers, educational_background: item});
              }}
            />
          </View>
        </View>

        {/* QA3 - economic_status */}
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
                {t('PAST_STUDENTS_PARENTS_Q3')}
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

        {/* QA4 - reason_for_sending_children_to_the_centre */}
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

        {/* QA5 - how_these_children_go_to_the_centre */}
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

        {/* QA6 - days_children_are_going_to_the_centre */}
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

        {/* QA7 - how_these_children_go_to_the_centre */}
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
                {t('PAST_STUDENTS_PARENTS_Q7')}
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
              valueProp={answers.children_occupation_nowadays}
              data={[
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
                {key: 4, value: 'Others', label: 'OTHERS'},
              ]}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  children_occupation_nowadays: item,
                });
              }}
            />
          </View>
          {answers.children_occupation_nowadays?.key == 4 && (
            <Input
              type={'default'}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  children_occupation_nowadays: {
                    ...answers.children_occupation_nowadays,
                    reason: text,
                  },
                });
              }}
              key={7}
              value={answers.children_occupation_nowadays?.reason}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          )}
        </View>

        {/* QA8  - no_of_parents_present*/}
        <View style={{marginBottom: 10}}>
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
                {t('PAST_STUDENTS_PARENTS_Q8')}
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
                setAnswers({
                  ...answers,
                  how_centre_was_helpful_in_the_development: text,
                });
              }}
              value={answers.how_centre_was_helpful_in_the_development}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>
        </View>

        {/* QA9 -  involvement_in_the_programs_of_the_centre*/}
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
                {t('PAST_STUDENTS_PARENTS_Q8')}
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

        {/* QA10 - contribution_in_running_centre_more_effectively */}
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

        {/* QA11 - expectations_from_the_centre*/}
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
});
