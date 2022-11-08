import {View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import React from 'react';
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

export default function TeacherQuestionsScreen() {
  const store = useSelector(state => state?.surveyReducer);
  const dispatch = useDispatch();
  let [answers, setAnswers] = useState({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    answer5: '',
    answer6: '',
  });
  const [error, setError] = useState({visible: false, message: ''});
  const [visible, setVisible] = React.useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);
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
        <View style={{flex: 0.55}}>
          <Text style={{color: COLORS.white, fontWeight: '600', fontSize: 20}}>
            {STRINGS.LOGIN.SURVEY}
          </Text>
        </View>
      </View>
    );
  };

  const pageValidator = () => {
    const {answer1, answer2, answer3, answer4, answer5, answer6} = answers;
    // if (!answer1 || !answer2 || !answer3 || !answer4 || !answer5 || !answer6) {
    //   return setError({
    //     visible: true,
    //     message: 'Please answer all questionaires',
    //   });
    // }

    // showModal();

    // navigate(ROUTES.AUTH.TEACHERQUESTONSSCREEN);
    let tmp = store?.surveyStatus;
    let new_obj = {...tmp[4], checked: true, completed: true, disabled: true};
    tmp.splice(4, 1, new_obj);

    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_STATUS, payload: tmp});
    showModal();
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
      </View>
      <SurveyCompletedModal visible={visible} hideModal={hideModal} />
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <KeyboardAwareScrollView style={{flex: 1, paddingHorizontal: 20}}>
        {/* QA0 */}
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
              <TextHandler
                style={{
                  color: 'black',
                  // textAlign: 'left',
                }}>
                {
                  'Keeping current trend in mind, do we  teach concepts in English ?'
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
                  value:
                    'Almost all the students are attending the Kendra from 2+ years',
                },
                {
                  key: 2,
                  value: 'Half of the students attends the class from 2+ years',
                },
                {
                  key: 3,
                  value: 'Only 10 % students attends the vlass from 2+ years',
                },
              ]}
              onValueChange={item => {
                setAnswers({...answers, answer3: item});
              }}
            />
          </View>
        </View>

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
                {
                  'How many students have passed out from this Kendra? (Since inception)'
                }
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder="Enter answer here"
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
                  'How many students have passed out from this Kendra? (Since inception)'
                }
              </TextHandler>
            </View>
          </View>

          <Input
            type={'numeric'}
            number={4}
            placeholder="Enter answer here"
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
        {/* QA3 */}
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
                {
                  'Keeping current trend in mind, do we  teach concepts in English ?'
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
                {key: 2, value: 'Yes , we use English everyday'},
                {key: 2, value: 'Sometimes we teach in English'},
                {key: 2, value: 'We rarely use English'},
              ]}
              onValueChange={item => {
                setAnswers({...answers, answer3: item});
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
                  'In which area we can see transformation  in our students? (Number should be  more than 50% of total students) - Comparison between before and after '
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
                  value:
                    'Drastic Academic improvement - Rating between 1 to 10',
                },
                {
                  key: 2,
                  value:
                    'Considerable change in behavioral pattern - Rating between 1 to 10',
                },
                {
                  key: 3,
                  value:
                    ' Progress in other subjects other  than academic (Sports, culture, art etc) -Rating between 1 to 10',
                },
                {key: 4, value: ' None of the above'},
              ]}
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
                {
                  'Any other observations which are not covered in above questions. '
                }
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
                {'How we teach social work to our students? '}
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
                {key: 1, value: 'Through story telling (Theory)'},
                {key: 2, value: 'Through activity (Practical)'},
                {key: 3, value: 'We donot focus on this area'},
              ]}
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
                {
                  'Do we compromise on our teaching agenda if student belonging to other religion attends the Kendra?'
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
                {key: 3, value: 'Sometimes'},
              ]}
              onValueChange={item => {
                setAnswers({...answers, answer6: item});
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
});
