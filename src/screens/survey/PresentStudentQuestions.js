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
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    answer6: '',
    answer7: '',
    answer8: '',
    answer9: '',
    answer10: '',
    answer11: '',
    answer12: '',
    answer13: '',
    answer14: '',
    answer15: '',
    answer16: '',
    answer17: '',
    answer18: '',
    answer19: '',
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
    const {answer1, answer2, answer3, answer4, answer5, answer6} = answers;
    let q = Object.keys(answers).length;
    let tmp2 = Object.values(answers).filter(el => {
      if (el) return el;
    });
    let p = tmp2.length;
    console.log(p, '/', q);
    if (!answer1 || !answer2 || !answer3 || !answer4 || !answer5 || !answer6) {
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

    console.log('payload past student ', payload);
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
              setAnswers({...answers, answer1: text});
            }}
            value={answers.answer1}
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
                  value: '20-25 % ',
                  label: 'CURRENT_STUDENTS_Q2_OPT1',
                },
                {
                  key: 2,
                  value: '40-50 %',
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
              valueProp={answers.answer2}
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
                  value: 'Need to remind ',
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
              valueProp={answers.answer3}
              onValueChange={item => {
                setAnswers({...answers, answer3: item});
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
            valueProp={answers.answer4}
            onValueChange={item => {
              setAnswers({...answers, answer4: item});
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
                  value: 'Our centre coordinator assist them',
                  label: 'CURRENT_STUDENTS_Q5_OPT5',
                },
              ]}
              valueProp={answers.answer5}
              onValueChange={item => {
                setAnswers({...answers, answer5: item});
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
              valueProp={answers.answer6}
              onValueChange={item => {
                setAnswers({...answers, answer6: item});
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
              setAnswers({...answers, answer7: text});
            }}
            value={answers.answer7}
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
              valueProp={answers.answer8}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer: item});
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
              valueProp={answers.answer9}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer9: item});
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
              valueProp={answers.answer10}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer10: item});
              }}
            />
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
                  value:'Others',
                  label: 'CURRENT_STUDENTS_Q11_OPT4',
                },
              ]}
              valueProp={answers.answer11}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer11: item});
              }}
            />
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
                  value: 'Yes (Enter activity list)  ',
                  label: 'CURRENT_STUDENTS_Q12_OPT1',
                },
                {
                  key: 2,
                  value: 'NO (Suggest activities)',
                  label: 'CURRENT_STUDENTS_Q12_OPT2',
                },
             
              ]}
              valueProp={answers.answer2}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer2: item});
              }}
            />
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
              valueProp={answers.answer13}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer13: item});
              }}
            />
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
              valueProp={answers.answer2}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer2: item});
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
                  value: '40-50 %',
                  label: 'CURRENT_STUDENTS_Q2_OPT2',
                },
              
              ]}
              valueProp={answers.answer2}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer2: item});
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
                  value: 'Yes (% of interested parents for this)',
                  label: 'CURRENT_STUDENTS_Q16_OPT1',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              
              ]}
              valueProp={answers.answer16}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer16: item});
              }}
            />
          </View>
        </View>

        {/* QA17 */}
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
                  value: '20-25 % ',
                  label: 'CURRENT_STUDENTS_Q2_OPT1',
                },
                {
                  key: 2,
                  value: '40-50 %',
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
              valueProp={answers.answer2}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer2: item});
              }}
            />
          </View>
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
                  value: '20-25 % ',
                  label: 'CURRENT_STUDENTS_Q2_OPT1',
                },
                {
                  key: 2,
                  value: '40-50 %',
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
              valueProp={answers.answer2}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer2: item});
              }}
            />
          </View>
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
                  value: '20-25 % ',
                  label: 'CURRENT_STUDENTS_Q2_OPT1',
                },
                {
                  key: 2,
                  value: '40-50 %',
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
              valueProp={answers.answer2}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer2: item});
              }}
            />
          </View>
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
                  value: '20-25 % ',
                  label: 'CURRENT_STUDENTS_Q2_OPT1',
                },
                {
                  key: 2,
                  value: '40-50 %',
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
              valueProp={answers.answer2}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer2: item});
              }}
            />
          </View>
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
                  value: '20-25 % ',
                  label: 'CURRENT_STUDENTS_Q2_OPT1',
                },
                {
                  key: 2,
                  value: '40-50 %',
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
              valueProp={answers.answer2}
              onValueChange={item => {
                console.log('item', item);
                setAnswers({...answers, answer2: item});
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
