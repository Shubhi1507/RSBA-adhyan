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

export default function TeacherQuestionsScreen() {
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const {t} = useContext(LocalizationContext);

  const dispatch = useDispatch();
  let [answers, setAnswers] = useState({
    consistency_in_attending_the_kendra: '',
    methods_used_to_teach_basic_concepts: '',
    teach_social_work: [],
    rating_academic: '',
    rating_behaviour_pattern: '',
    rating_sports: '',
    rating_culture: '',
    rating_sincerity: '',
    rating_punctuality: '',
    rating_trustworthy: '',
    leadership_qualities: '',
    compromise_on_our_teaching_agenda: '',
    personally_meet_all_the_parents_every_month: '',
    qualification_of_the_teacher: '',
    since_when_teacher_is_associated_with_this_kendra: '',
    reason_to_join_this_kendra: '',
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
  let tmp2 = [...answers.teach_social_work];

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
      teach_social_work,
      expectations_from_sanstha_for_the_betterment,
      personally_meet_all_the_parents_every_month,
      qualification_of_the_teacher,
      leadership_qualities,
      rating_punctuality,
      rating_sincerity,
      rating_trustworthy,
      reason_to_join_this_kendra,
      since_when_teacher_is_associated_with_this_kendra,
      compromise_on_our_teaching_agenda,
      rating_academic,
      rating_behaviour_pattern,
      rating_culture,
      rating_sports,
    } = answers;
    let q = 11;
    let unanswered = 11;

    let ans1 = !consistency_in_attending_the_kendra ? 0 : 1;
    let ans2 = !methods_used_to_teach_basic_concepts ? 0 : 1;
    let ans3 = teach_social_work.length > 0 ? 1 : 0;
    let ans4 =
      rating_academic &&
      rating_behaviour_pattern &&
      rating_sports &&
      rating_culture
        ? 1
        : 0;
    let ans5 =
      rating_sincerity &&
      rating_punctuality &&
      rating_trustworthy &&
      leadership_qualities
        ? 1
        : 0;
    let ans6 = !compromise_on_our_teaching_agenda ? 0 : 1;
    let ans7 =
      personally_meet_all_the_parents_every_month?.value === 'Yes' &&
      !personally_meet_all_the_parents_every_month?.other
        ? 0
        : !personally_meet_all_the_parents_every_month?.value
        ? 0
        : 1;
    let ans8 = !qualification_of_the_teacher ? 0 : 1;
    let ans9 = !since_when_teacher_is_associated_with_this_kendra ? 0 : 1;
    let ans10 = !reason_to_join_this_kendra ? 0 : 1;
    let ans11 = !expectations_from_sanstha_for_the_betterment ? 0 : 1;

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

    new_obj = {
      ...tmp[4],
      attempted: true,
      completed: p === 0 ? true : false,
      disabled: false,
      totalQue: q,
      answered: q - p,
    };

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

    let formdata = new FormData();
    formdata.append('center_id', '5');
    formdata.append('audience_id', '6');
    formdata.append(
      'survey_data',
      `{'How consistent are the students in attending the Kendra?
      ': '${consistency_in_attending_the_kendra?.value}',
      'What method we use to teach basic concepts of different topics other than study? (Such as religion, traditions, Sewa, behavioural science etc.)
      ' : '${methods_used_to_teach_basic_concepts?.value}',

      'How we teach social work to our students? (Multiple choice)
      : '${      teach_social_work.map()}',
      What is the status of these anti -social institutions after our center: '${status_of_anti_social_institutions_after_our_center_establishment?.value},
      Do our beneficiaries also take benefits from other organisations: '${our_beneficiaries_also_take_benefits_from_other_organisations?.value}'}`,
    );

    try {
      const url = BASE_URL + 'center/survey';
      // const response = await fetch(url, {
      //   method: 'POST',
      //   body: formdata,
      // });
      // if (response.status === 200) {
      // }
    } catch (error) {
      console.log(error);
    }

    dispatch({type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY, payload: payload});
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
    showModal();
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
      teach_social_work: tmp2,
    });
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
        {/* QA1 - consistency_in_attending_the_kendra*/}
        <View style={{marginBottom: 10}}>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.consistency_in_attending_the_kendra
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
                  color: !answers.consistency_in_attending_the_kendra
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

        {/* QA2 - methods_used_to_teach_basic_concepts*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.methods_used_to_teach_basic_concepts
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
                  color: !answers.methods_used_to_teach_basic_concepts
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

        {/* QA3 -  teach_social_work*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.teach_social_work.length > 0
                    ? COLORS.orange
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
                    answers.teach_social_work.length > 0
                      ? COLORS.black
                      : COLORS.white,
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
                {t('TEACHER_Q3')}
              </TextHandler>
            </View>
          </View>

          <View>
            {[
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
                value: 'Through activity (Practical) ',
                label: 'TEACHER_Q3_OPT3',
              },
              {
                key: 4,
                value: 'We don’t focus on this area',
                label: 'TEACHER_Q3_OPT4',
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
                      answers.teach_social_work.filter(
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

        {/* QA4 - rating_academic rating_behaviour_pattern rating_sports rating_culture*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.rating_academic ||
                  !answers.rating_behaviour_pattern ||
                  !answers.rating_sports ||
                  !answers.rating_culture
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
                    !answers.rating_academic ||
                    !answers.rating_behaviour_pattern ||
                    !answers.rating_sports ||
                    !answers.rating_culture
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
                {t('TEACHER_Q4')}
              </TextHandler>
            </View>
          </View>

          <View>
            <TextHandler>{t('TEACHER_Q4_OPT1')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({...answers, rating_academic: text});
                }
              }}
              value={answers.rating_academic}
              empty={!answers.rating_academic}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('TEACHER_Q4_OPT2')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({...answers, rating_behaviour_pattern: text});
                }
              }}
              value={answers.rating_behaviour_pattern}
              empty={!answers.rating_behaviour_pattern}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('TEACHER_Q4_OPT3')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({...answers, rating_sports: text});
                }
              }}
              value={answers.rating_sports}
              empty={!answers.rating_sports}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
          <View>
            <TextHandler>{t('TEACHER_Q4_OPT4')}</TextHandler>
            <Input
              type={'numeric'}
              number={2}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                if (text <= 10) {
                  setAnswers({...answers, rating_culture: text});
                }
              }}
              value={answers.rating_culture}
              empty={!answers.rating_culture}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* QA5 */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.rating_sincerity ||
                  !answers.rating_punctuality ||
                  !answers.rating_trustworthy ||
                  !answers.leadership_qualities
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
                    !answers.rating_sincerity ||
                    !answers.rating_punctuality ||
                    !answers.rating_trustworthy ||
                    !answers.leadership_qualities
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
                if (text <= 10) {
                  setAnswers({...answers, rating_sincerity: text});
                }
              }}
              value={answers.rating_sincerity}
              empty={!answers.rating_sincerity}
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
                if (text <= 10) {
                  setAnswers({...answers, rating_punctuality: text});
                }
              }}
              value={answers.rating_punctuality}
              empty={!answers.rating_punctuality}
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
                if (text <= 10) {
                  setAnswers({...answers, rating_trustworthy: text});
                }
              }}
              value={answers.rating_trustworthy}
              empty={!answers.rating_trustworthy}
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
                if (text <= 10) {
                  setAnswers({...answers, leadership_qualities: text});
                }
              }}
              value={answers.leadership_qualities}
              empty={!answers.leadership_qualities}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.25,
              }}
            />
          </View>
        </View>

        {/* QA6  - compromise_on_our_teaching_agenda*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.compromise_on_our_teaching_agenda
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
                  color: !answers.compromise_on_our_teaching_agenda
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

        {/* QA7 - personally_meet_all_the_parents_every_month  */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.personally_meet_all_the_parents_every_month ||
                  (answers.personally_meet_all_the_parents_every_month
                    ?.value === 'Yes' &&
                    !answers.personally_meet_all_the_parents_every_month?.other)
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
                    !answers.personally_meet_all_the_parents_every_month ||
                    (answers.personally_meet_all_the_parents_every_month
                      ?.value === 'Yes' &&
                      !answers.personally_meet_all_the_parents_every_month
                        ?.other)
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
                  value: 'Yes',
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
                      other: text,
                    },
                  });
                }}
                // multi
                value={
                  answers.personally_meet_all_the_parents_every_month?.other
                }
                empty={
                  !answers.personally_meet_all_the_parents_every_month?.other
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

        {/* QA8 - qualification_of_the_teacher */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.qualification_of_the_teacher
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
                  color: !answers.qualification_of_the_teacher
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

        {/* QA9- since_when_teacher_is_associated_with_this_kendra */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.since_when_teacher_is_associated_with_this_kendra
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
                    !answers.since_when_teacher_is_associated_with_this_kendra
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

        {/* QA10 - reason_to_join_this_kendra*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.reason_to_join_this_kendra
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
                  color: !answers.reason_to_join_this_kendra
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
            empty={!answers.reason_to_join_this_kendra}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>

        {/* QA11*/}
        {/* <View>
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
        </View> */}

        {/* QA11 - expectations_from_sanstha_for_the_betterment*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.expectations_from_sanstha_for_the_betterment
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
                  color: !answers.expectations_from_sanstha_for_the_betterment
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
                empty={
                  !answers.expectations_from_sanstha_for_the_betterment?.text
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
  question: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.black,
  },
});
