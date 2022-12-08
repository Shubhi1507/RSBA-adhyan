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

export default function PrabuddhaJanQuestions() {
  const dispatch = useDispatch();
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);

  let totalSurveys = store.totalSurveys;
  let [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
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
      if (entry?.prabbudhJan) {
        setAnswers(entry.prabbudhJan);
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
    const {answer1, answer2, answer3, answer4, answer5} = answers;
    let q = Object.keys(answers).length;
    let tmp2 = Object.values(answers).filter(el => {
      if (el) return el;
    });
    let p = tmp2.length;
    console.log(p, '/', q);
    if (!answer1 || !answer2 || !answer3 || !answer4 || !answer5) {
      new_obj = {
        ...tmp[7],
        attempted: true,
        completed: false,
        disabled: false,
        totalQue: q,
        answered: p,
      };
    } else {
      new_obj = {
        ...tmp[7],
        attempted: true,
        completed: true,
        disabled: true,
        totalQue: q,
        answered: p,
      };
    }
    tmp.splice(7, 1, new_obj);

    let surveyAnswers = [...answersArrTmp];
    let payload = {};

    if (answersArrTmp.length > 0) {
      let new_obj1 = {prabbudhJan: answers};
      let index;
      surveyAnswers.some(function (entry, i) {
        if (entry?.prabbudhJan) {
          index = i;
        }
      });
      if (index != undefined) {
        surveyAnswers.splice(index, 1, new_obj1);
      } else {
        surveyAnswers.push({prabbudhJan: answers});
      }
    } else {
      surveyAnswers.push({prabbudhJan: answers});
    }
    payload = {
      ...store.currentSurveyData,
      currentSurveyStatus: tmp,
      surveyAnswers,
      updatedAt: new Date().toString(),
    };
    let tmp1 = FindAndUpdate(totalSurveys, payload);

    console.log('payload prabbudhJan', payload);
    dispatch({type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY, payload: payload});
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
    showModal();
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header title={t('PRABUDDHA_JAN')} onPressBack={goBack} />
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
                {t('INFLUENTIAL_PEOPELE_Q1')}
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
            valueProp={answers.answer1}
            onValueChange={item => {
              setAnswers({...answers, answer1: item});
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
                {t('INFLUENTIAL_PEOPELE_Q2')}
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
                  value: 'Through a known person  ',
                  label: 'INFLUENTIAL_PEOPELE_Q2_OPT1',
                },
                {
                  key: 2,
                  value: 'Sangh ',
                  label: 'INFLUENTIAL_PEOPELE_Q2_OPT2',
                },
                {
                  key: 3,
                  value: 'Alumni',
                  label: 'INFLUENTIAL_PEOPELE_Q2_OPT3',
                },
                {
                  key: 4,
                  value: 'Due to our social works',
                  label: 'INFLUENTIAL_PEOPELE_Q2_OPT4',
                },
              ]}
              valueProp={answers.answer2}
              onValueChange={item => {
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
                {t('INFLUENTIAL_PEOPELE_Q3')}
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
                {t('INFLUENTIAL_PEOPELE_Q4')}
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
                  value: 'Highly Influential',
                  label: 'YES',
                },
                {
                  key: 2,
                  value: 'Not much',
                  label: 'NO',
                },
                {
                  key: 3,
                  value: 'Only in certain sections',
                  label: 'INFLUENTIAL_PEOPELE_Q4_OPT3',
                },
                
              ]}
              valueProp={answers.answer2}
              onValueChange={item => {
                setAnswers({...answers, answer2: item});
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
});
