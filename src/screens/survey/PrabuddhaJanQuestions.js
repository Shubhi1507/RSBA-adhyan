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

export default function PrabuddhaJanQuestions() {
  const dispatch = useDispatch();
  const store = useSelector(state => state?.surveyReducer);
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
        console.log('entry?.prabbudhJan', entry?.prabbudhJan);
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
    if (!answer1 || !answer2 || !answer3 || !answer4 || !answer5 ) {
      new_obj = {
        ...tmp[7],
        attempted: true,
        completed: false,
        disabled: false,
      };
    } else {
      new_obj = {...tmp[7], attempted: true, completed: true, disabled: true};
    }
    tmp.splice(7, 1, new_obj);
    console.log('tmp', tmp);

    let surveyAnswers = [...answersArrTmp];
    let payload = {};
    console.log('answersArrTmp;', answersArrTmp);

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
        console.log('exist prabbudhJan', index, surveyAnswers);
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
    };
    console.log('payload prabbudhJan', payload);
    dispatch({type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY, payload: payload});
    showModal();
  };

  const HeaderContent = () => {
    return (
      <View
        style={{
          flex: 0.3,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: screenWidth,
        }}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            flex: 0.33,
          }}>
          <TouchableOpacity onPress={() => goBack()}>
            <ADIcons name="left" color={COLORS.white} size={21} />
          </TouchableOpacity>
          <FAIcons name="user-circle-o" color={COLORS.white} size={21} />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 20}}>
            Prabuddha Jan's Survey
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
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
                {'How does donors and well wishers help Economic'}
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
                value: 'Social',
              },
              {
                key: 2,
                value: 'Others',
              },
            ]}
            valueProp={answers.answer1}
            onValueChange={item => {
              setAnswers({...answers, answer1: item});
            }}
          />
          {answers.answer1?.value === 'Others' && (
              <Input
                placeholder="Enter reason here"
                name="any"
                onChangeText={text => {
                  setAnswers({...answers, answer1: {...answers.answer1, text}});
                }}
                value={answers.answer1?.text}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.5,
                }}
              />
            )}
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
                {'How does donors and well wishers are connected to us .'}
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
                },
                {
                  key: 2,
                  value: 'Sangh ',
                },
                {
                  key: 3,
                  value: 'Alumni',
                },
                {
                  key: 4,
                  value: 'Due to our social works',
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
                {
                  'Are these well wishers and donors involved in day to day functioning of the Kendra '
                }
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
                  value: 'Active ',
                },
                {
                  key: 2,
                  value: ' Inactive',
                },
                {
                  key: 3,
                  value: ' Not much interested ',
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
                {'Influence of well wishers in different sections of society '}
              </TextHandler>
            </View>
          </View>

          <Input
            placeholder="Enter answer here"
            name="any"
            onChangeText={text => {
              setAnswers({...answers, answer4: text});
            }}
            value={answers.answer4}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.5,
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
                {'Influence of well wishers in different sections of  society '}
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
                {key: 1, value: 'Highly Influential'},
                {key: 2, value: 'Not much '},
                {key: 3, value: 'Only in certain questions'},
              ]}
            valueProp={answers.answer4}
              onValueChange={item => {
                setAnswers({...answers, answer4: item});
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
                {
                  'Have these well wishers and donors helped us during Corona crisis ?'
                }
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
                {key: 1, value: 'Yes'},
                {key: 2, value: 'No'},
              ]}
            valueProp={answers.answer5}
              onValueChange={item => {
                setAnswers({...answers, answer5: item});
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
