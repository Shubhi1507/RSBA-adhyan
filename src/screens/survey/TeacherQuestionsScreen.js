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

export default function TeacherQuestionsScreen() {
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const {t} = useContext(LocalizationContext);

  const dispatch = useDispatch();
  let [answers, setAnswers] = useState({
    consistency_in_attending_the_kendra: '',
    methods_used_to_teach_basic_concepts: '',
    methods_used_to_teach_social_work: '',
    which_area_we_can_see_transformation_in_our_students: '',
    rating_sincerity: '',
    rating_punctuality: '',
    rating_trustworthy: '',
    leadership_qualities: '',
    compromise_on_our_teaching_agenda: '',
    personally_meet_all_the_parents_every_month: '',
    qualification_of_the_teacher: '',
    since_when_teacher_is_associated_with_this_kendra: '',
    reason_to_join_this_kendra: '',
    role_model: '',
    expectations_from_sanstha_for_the_betterment: '',
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
      if (entry?.teacher) {
        setAnswers(entry.teacher);
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
      consistency_in_attending_the_kendra,
      methods_used_to_teach_basic_concepts,
      methods_used_to_teach_social_work,
      which_area_we_can_see_transformation_in_our_students,
      expectations_from_sanstha_for_the_betterment,
      personally_meet_all_the_parents_every_month,
      qualification_of_the_teacher,
      leadership_qualities,
      rating_punctuality,
      rating_sincerity,
      rating_trustworthy,
      reason_to_join_this_kendra,
      role_model,
      since_when_teacher_is_associated_with_this_kendra,
      compromise_on_our_teaching_agenda,
    } = answers;
    let q = 12;
    let p = Object.values(answers).filter(el => {
      if (el) return el;
    }).length;
    let answer5 =
      rating_punctuality &&
      rating_sincerity &&
      rating_trustworthy &&
      leadership_qualities
        ? true
        : false;

    if (answer5 === true) {
      p = p - 3;
    } else {
      if (
        rating_punctuality.length > 0 ||
        rating_sincerity.length > 0 ||
        rating_trustworthy.length > 0 ||
        leadership_qualities.length > 0
      ) {
        p = p - 1;
      }
    }

    if (
      !consistency_in_attending_the_kendra ||
      !methods_used_to_teach_basic_concepts ||
      !methods_used_to_teach_social_work ||
      !which_area_we_can_see_transformation_in_our_students ||
      !compromise_on_our_teaching_agenda ||
      !answer5
    ) {
      new_obj = {
        ...tmp[4],
        attempted: true,
        completed: false,
        disabled: false,
        totalQue: q,
        answered: p,
      };
    } else {
      new_obj = {
        ...tmp[4],
        attempted: true,
        completed: true,
        disabled: true,
        totalQue: q,
        answered: p,
      };
    }
    tmp.splice(4, 1, new_obj);

    let surveyAnswers = [...answersArrTmp];
    let payload = {};

    if (answersArrTmp.length > 0) {
      let new_obj1 = {teacher: answers};
      let index;
      surveyAnswers.some(function (entry, i) {
        if (entry?.teacher) {
          index = i;
        }
      });
      if (index != undefined) {
        surveyAnswers.splice(index, 1, new_obj1);
      } else {
        surveyAnswers.push({teacher: answers});
      }
    } else {
      surveyAnswers.push({teacher: answers});
    }
    payload = {
      ...store.currentSurveyData,
      currentSurveyStatus: tmp,
      surveyAnswers,
      updatedAt: new Date().toString(),
    };
    let tmp1 = FindAndUpdate(totalSurveys, payload);

    console.log('payload teacher', payload, tmp1);
    dispatch({type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY, payload: payload});
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
    showModal();
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header title={t('TEACHERS_SURVERS')} onPressBack={goBack} />
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
                {t('TEACHER_Q1')}
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
                  label: 'TEACHER_Q1_OPT1',
                },
                {
                  key: 2,
                  value: 'Half of the students attends the class from 2+ years',
                  label: 'TEACHER_Q1_OPT2',
                },
                {
                  key: 3,
                  value: 'Only 10 % students attends the vlass from 2+ years',
                  label: 'TEACHER_Q1_OPT3',
                },
              ]}
              valueProp={answers.consistency_in_attending_the_kendra}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  consistency_in_attending_the_kendra: item,
                });
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
                {t('TEACHER_Q2')}
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
                  value: 'Through story telling (Theory)',
                  label: 'TEACHER_Q2_OPT1',
                },
                {
                  key: 2,
                  value: 'Through games',
                  label: 'TEACHER_Q2_OPT2',
                },
                {
                  key: 3,
                  value: 'Through activity (Practical)',
                  label: 'TEACHER_Q2_OPT3',
                },
              ]}
              valueProp={answers.methods_used_to_teach_basic_concepts}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  methods_used_to_teach_basic_concepts: item,
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
                {t('TEACHER_Q3')}
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
                  value: 'Through story telling (Theory)',
                  label: 'TEACHER_Q3_OPT1',
                },
                {
                  key: 2,
                  value: 'Through games',
                  label: 'TEACHER_Q3_OPT2',
                },
                {
                  key: 3,
                  value: 'Through activity (Practical)',
                  label: 'TEACHER_Q3_OPT3',
                },
                {
                  key: 4,
                  value: 'We don’t focus on this area',
                  label: 'TEACHER_Q3_OPT4',
                },
              ]}
              valueProp={answers.methods_used_to_teach_social_work}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  methods_used_to_teach_social_work: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA4 */}
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
                {t('TEACHER_Q4')}
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
                  label: 'TEACHER_Q4_OPT1',
                },
                {
                  key: 2,
                  value:
                    'Considerable change in behavioral pattern - Rating between 1 to 10',
                  label: 'TEACHER_Q4_OPT2',
                },
                {
                  key: 3,
                  value:
                    ' Progress in other subjects other than academic (Sports, culture, art etc) - Rating between 1 to 10',
                  label: 'TEACHER_Q4_OPT3',
                },
                {key: 4, value: 'Other', label: 'TEACHER_Q4_OPT4'},
                {key: 5, value: 'None', label: 'TEACHER_Q4_OPT5'},
              ]}
              valueProp={
                answers.which_area_we_can_see_transformation_in_our_students
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  which_area_we_can_see_transformation_in_our_students: item,
                });
              }}
            />
            {answers.which_area_we_can_see_transformation_in_our_students
              ?.key == 4 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    which_area_we_can_see_transformation_in_our_students: {
                      ...answers.which_area_we_can_see_transformation_in_our_students,
                      other: text,
                    },
                  });
                }}
                value={
                  answers.which_area_we_can_see_transformation_in_our_students
                    ?.text
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

        {/* QA5 */}
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
                {t('TEACHER_Q5')}
              </TextHandler>
            </View>
          </View>

          <View>
            <TextHandler>{t('TEACHER_Q5_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_sincerity: text});
              }}
              value={answers.rating_sincerity}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('TEACHER_Q5_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_punctuality: text});
              }}
              value={answers.rating_punctuality}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('TEACHER_Q5_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, rating_trustworthy: text});
              }}
              value={answers.rating_trustworthy}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('TEACHER_Q5_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({...answers, leadership_qualities: text});
              }}
              value={answers.leadership_qualities}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
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
                {t('TEACHER_Q6')}
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
                {
                  key: 3,
                  value: 'Sometimes',
                  label: 'TEACHER_Q6_OPT3',
                },
              ]}
              valueProp={answers.compromise_on_our_teaching_agenda}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  compromise_on_our_teaching_agenda: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA7  */}
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
                {t('TEACHER_Q7')}
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
                  value: 'Yes (What points you discuss)',
                  label: 'TEACHER_Q7_OPT1',
                },
                {key: 2, value: 'No', label: 'NO'},
              ]}
              valueProp={answers.personally_meet_all_the_parents_every_month}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  personally_meet_all_the_parents_every_month: item,
                });
              }}
            />
            {answers.personally_meet_all_the_parents_every_month?.key === 1 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    personally_meet_all_the_parents_every_month: {
                      ...answers.personally_meet_all_the_parents_every_month,
                      reason: text,
                    },
                  });
                }}
                // multi
                value={answers.personally_meet_all_the_parents_every_month?.reason}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.25,
                }}
              />
            )}
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
              <TextHandler
                style={{
                  color: 'black',
                  // textAlign: 'left',
                }}>
                {t('TEACHER_Q8')}
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
                {key: 1, value: 'Post graduate', label: 'TEACHER_Q8_OPT1'},
                {key: 2, value: 'Graduate', label: 'TEACHER_Q8_OPT2'},
                {key: 3, value: '12th', label: 'TEACHER_Q8_OPT3'},
                {key: 4, value: '10th', label: 'TEACHER_Q8_OPT4'},
                {key: 5, value: 'Less than 10th', label: 'TEACHER_Q8_OPT5'},
              ]}
              valueProp={answers.qualification_of_the_teacher}
              onValueChange={item => {
                setAnswers({...answers, qualification_of_the_teacher: item});
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
              <TextHandler
                style={{
                  color: 'black',
                  // textAlign: 'left',
                }}>
                {t('TEACHER_Q9')}
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
                {key: 1, value: '3+ years', label: 'TEACHER_Q9_OPT1'},
                {key: 2, value: '2 to 3 years', label: 'TEACHER_Q9_OPT2'},
                {key: 3, value: '1 to 2 years', label: 'TEACHER_Q9_OPT3'},
                {key: 4, value: 'Less than 1 year', label: 'TEACHER_Q9_OPT4'},
              ]}
              valueProp={
                answers.since_when_teacher_is_associated_with_this_kendra
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  since_when_teacher_is_associated_with_this_kendra: item,
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
              <TextHandler
                style={{
                  color: 'black',
                  // textAlign: 'left',
                }}>
                {t('TEACHER_Q10')}
              </TextHandler>
            </View>
          </View>

          <Input
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({...answers, reason_to_join_this_kendra: text});
            }}
            multi
            value={answers.reason_to_join_this_kendra}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
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
                {t('TEACHER_Q11')}
              </TextHandler>
            </View>
          </View>

          <Input
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({...answers, role_model: text});
            }}
            value={answers.role_model}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
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
                {t('TEACHER_Q12')}
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
                {key: 1, value: 'Freedom for work', label: 'TEACHER_Q12_OPT1'},
                {key: 2, value: 'Cooperation', label: 'TEACHER_Q12_OPT2'},
                {
                  key: 3,
                  value: 'Other (Please enter)',
                  label: 'TEACHER_Q12_OPT3',
                },
                {
                  key: 4,
                  value: ' None of the above  ',
                  label: 'TEACHER_Q12_OPT4',
                },
              ]}
              valueProp={answers.expectations_from_sanstha_for_the_betterment}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  expectations_from_sanstha_for_the_betterment: item,
                });
              }}
            />
            {answers.expectations_from_sanstha_for_the_betterment?.key == 3 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    expectations_from_sanstha_for_the_betterment: {
                      ...answers.expectations_from_sanstha_for_the_betterment,
                      other: text,
                    },
                  });
                }}
                value={
                  answers.expectations_from_sanstha_for_the_betterment?.text
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
