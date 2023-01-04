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
import {useContext} from 'react';
import LocalizationContext from '../../context/LanguageContext';
import {Checkbox} from 'react-native-paper';
import {BASE_URL} from '../../networking';
import LoaderIndicator from '../../components/Loader';

export default function BastiQuestions() {
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);
  const [dataLoading, setDataLoading] = useState(false);
  let totalSurveys = store.totalSurveys;
  const dispatch = useDispatch();
  let [answers, setAnswers] = useState({
    are_any_other_organizations_active_in_the_basti: '',
    activities_conducted_by_these_organisations: [],
    involved_in_anti_social_activities: '',
    status_of_anti_social_institutions_after_our_center_establishment: '',
    our_beneficiaries_also_take_benefits_from_other_organisations: '',
    total_population_of_the_basti: '',
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

  let tmp2 = [...answers.activities_conducted_by_these_organisations];

  useEffect(() => {
    answersArrTmp.some(function (entry, i) {
      if (entry?.basti) {
        setAnswers(entry.basti);
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
      if (el.value === 'Other') {
        if (!el.hasOwnProperty('other') || !el.other) {
          j = 0;
        }
      }
    });
    return j;
  };

  const pageValidator = async () => {
    setDataLoading(true);
    let tmp = store?.currentSurveyData.currentSurveyStatus;
    let new_obj;
    const {
      are_any_other_organizations_active_in_the_basti,
      activities_conducted_by_these_organisations,
      involved_in_anti_social_activities,
      status_of_anti_social_institutions_after_our_center_establishment,
      our_beneficiaries_also_take_benefits_from_other_organisations,
      total_population_of_the_basti,
    } = answers;
    let q = 6;
    let unanswered = 6;
    // answeres
    let ans1 =
      are_any_other_organizations_active_in_the_basti?.value === 'Yes' &&
      !are_any_other_organizations_active_in_the_basti?.other
        ? 0
        : !are_any_other_organizations_active_in_the_basti?.value
        ? 0
        : 1;
    let ans2 =
      activities_conducted_by_these_organisations.length !== 0
        ? checkarrayforOtherValues(
            activities_conducted_by_these_organisations,
            'other',
          )
        : 0;
    let ans3 = !involved_in_anti_social_activities ? 0 : 1;

    let ans4 =
      !status_of_anti_social_institutions_after_our_center_establishment
        ? 0
        : 1;
    let ans5 = !our_beneficiaries_also_take_benefits_from_other_organisations
      ? 0
      : 1;
    let ans6 =
      !total_population_of_the_basti?.hindu ||
      !total_population_of_the_basti?.other
        ? 0
        : 1;
    console.log(ans1, ans2, ans3, ans4, ans5, ans6);

    let p = unanswered - (ans1 + ans2 + ans3 + ans4 + ans5 + ans6);

    console.log(q - p, '/', q);

    new_obj = {
      ...tmp[6],
      attempted: true,
      completed: p === 0 ? true : false,
      disabled: false,
      totalQue: q,
      answered: q - p,
    };

    tmp.splice(6, 1, new_obj);

    let surveyAnswers = [...answersArrTmp];
    let payload = {};

    if (answersArrTmp.length > 0) {
      let new_obj1 = {basti: answers};
      let index;
      surveyAnswers.some(function (entry, i) {
        if (entry?.basti) {
          index = i;
        }
      });
      if (index != undefined) {
        surveyAnswers.splice(index, 1, new_obj1);
      } else {
        surveyAnswers.push({basti: answers});
      }
    } else {
      surveyAnswers.push({basti: answers});
    }
    payload = {
      ...store.currentSurveyData,
      currentSurveyStatus: tmp,
      surveyAnswers,
      updatedAt: new Date().toString(),
    };
    let tmp1 = FindAndUpdate(totalSurveys, payload);
    dispatch({
      type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
      payload: payload,
    });
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});

    try {
      if (p === 0) {
        let surveydata = {
          // 'Are any other organizations active in the basti?'
          100: `${
            are_any_other_organizations_active_in_the_basti?.value === 'Yes'
              ? are_any_other_organizations_active_in_the_basti?.other
              : 'No'
          }`,
          // 'What kind of activities are conducted by these organisations? (can also select more than one)'
          101: `${activities_conducted_by_these_organisations.map(el => {
            if (el.value === 'Other') {
              return el?.other
            }
            return el.value
          }).join()
          .replace(/\,/g, '||')}`,
          // 'Are they involved in any anti - social activities?'
          102: `${involved_in_anti_social_activities}`,
          // 'What is the status of these anti -social institutions after our center'
          103: `${status_of_anti_social_institutions_after_our_center_establishment?.value}`,
          // 'Do our beneficiaries also take benefits from other organisations'
          104: `${our_beneficiaries_also_take_benefits_from_other_organisations?.value}`,
          // 'Total population of the Basti'
          105: `Hindu - ${total_population_of_the_basti?.hindu}, Other - ${total_population_of_the_basti?.other}`,
        };
        console.log('surveydata', surveydata);
        const formdata = new FormData();
        formdata.append('center_id', store?.currentSurveyData?.api_centre_id);
        formdata.append('audience_id', 8);
        formdata.append('survey_data', JSON.stringify(surveydata));
        const requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow',
        };
        const response = await fetch(
          BASE_URL + 'center/survey',
          requestOptions,
        );
        console.log('response->', await response.json());
      }

      showModal();
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
      setError({visible: true, message: t('SOMETHING_WENT_WRONG')});
      console.log('error', error);
    }
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
      activities_conducted_by_these_organisations: tmp2,
    });
  };

  return (
    <View style={styles.container}>
      <LoaderIndicator loading={dataLoading} />
      <View style={{flex: 0.2}}>
        <Header title={t('BASTI')} onPressBack={goBack} />
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
        {/* QA1 - are_any_other_organizations_active_in_the_basti */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
           
              <TextHandler
                style={{
                  color:
                    !answers.are_any_other_organizations_active_in_the_basti ||
                    (answers.are_any_other_organizations_active_in_the_basti
                      ?.value === 'Yes' &&
                      !answers.are_any_other_organizations_active_in_the_basti
                        ?.other)
                      ? COLORS.red
                      : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "700"
                }}>
                {1}
              </TextHandler>
            
              <TextHandler
                style={{
                  color:
                    !answers.are_any_other_organizations_active_in_the_basti ||
                    (answers.are_any_other_organizations_active_in_the_basti
                      ?.value === 'Yes' &&
                      !answers.are_any_other_organizations_active_in_the_basti
                        ?.other)
                      ? COLORS.red
                      : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "900"
                }}>
 {'•'}
              </TextHandler>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>{t('BASTI_Q1')}</TextHandler>
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
                  label: 'BASTI_Q1_OPT1',
                },
                {
                  key: 2,
                  value: 'No',
                  label: 'NO',
                },
              ]}
              valueProp={
                answers.are_any_other_organizations_active_in_the_basti
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  are_any_other_organizations_active_in_the_basti: item,
                });
              }}
            />
            {answers.are_any_other_organizations_active_in_the_basti?.key ==
              1 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    are_any_other_organizations_active_in_the_basti: {
                      ...answers.are_any_other_organizations_active_in_the_basti,
                      other: text,
                    },
                  });
                }}
                value={
                  answers.are_any_other_organizations_active_in_the_basti?.other
                }
                empty={
                  !answers.are_any_other_organizations_active_in_the_basti
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
        </View>

        {/* QA2 - activities_conducted_by_these_organisations*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
           
              <TextHandler
                style={{
                  color:
                    answers.activities_conducted_by_these_organisations
                      .length === 0 ||
                    checkarrayforOtherValues(
                      answers.activities_conducted_by_these_organisations,
                      'other',
                    ) === 0
                      ? COLORS.red
                      : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "700"
                }}>
                {2}
              </TextHandler>
           
              <TextHandler
                style={{
                  color:
                    answers.activities_conducted_by_these_organisations
                      .length === 0 ||
                    checkarrayforOtherValues(
                      answers.activities_conducted_by_these_organisations,
                      'other',
                    ) === 0
                      ? COLORS.red
                      : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "900"
                }}>
              {'•'}

              </TextHandler>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>{t('BASTI_Q2')}</TextHandler>
            </View>
          </View>

          <View>
            {[
              {
                key: 1,
                value: 'Education',
                label: 'BASTI_Q2_OPT1',
              },
              {
                key: 2,
                value: 'Health',
                label: 'BASTI_Q2_OPT2',
              },
              {
                key: 3,
                value: 'Social',
                label: 'BASTI_Q2_OPT3',
              },
              {
                key: 4,
                value: 'Environmental',
                label: 'BASTI_Q2_OPT4',
              },
              {
                key: 6,
                value: 'Other',
                label: 'BASTI_Q2_OPT6',
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
                      answers.activities_conducted_by_these_organisations.filter(
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
            {answers.activities_conducted_by_these_organisations.filter(
              item => item.value === 'Other',
            ).length > 0 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  let tmp = [
                    ...answers.activities_conducted_by_these_organisations,
                  ];
                  tmp.forEach((el, index) => {
                    if (el.value === 'Other') {
                      let newans = {...el, other: text};
                      tmp.splice(index, 1, newans);
                    }
                  });
                  setAnswers({
                    ...answers,
                    activities_conducted_by_these_organisations: tmp,
                  });
                }}
                value={
                  answers.activities_conducted_by_these_organisations.filter(
                    el => el.value === 'Other',
                  ).length > 0
                    ? answers.activities_conducted_by_these_organisations.filter(
                        el => el.value === 'Other',
                      )[0]?.['other']
                    : ''
                }
                empty={
                  !answers.activities_conducted_by_these_organisations.filter(
                    el => el.value === 'Other',
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

        {/* QA3 - involved_in_anti_social_activities*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
           
              <TextHandler
                style={{
                  color: !answers.involved_in_anti_social_activities
                    ? COLORS.red
                    : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "700"
                }}>
                {3}
              </TextHandler>
          
          
              <TextHandler
                style={{
                  color: !answers.involved_in_anti_social_activities
                    ? COLORS.red
                    : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "900"
                }}>
               {'•'}

              </TextHandler>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>{t('BASTI_Q3')}</TextHandler>
            </View>
          </View>
          <Input
            placeholder={`${t('ENTER_ANSWER')}`}
            name="any"
            onChangeText={text => {
              setAnswers({
                ...answers,
                involved_in_anti_social_activities: text,
              });
            }}
            value={answers.involved_in_anti_social_activities}
            empty={!answers.involved_in_anti_social_activities}
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
        </View>

        {/* QA4 -status_of_anti_social_institutions_after_our_center_establishment */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
          
              <TextHandler
                style={{
                  color:
                    !answers.status_of_anti_social_institutions_after_our_center_establishment
                      ? COLORS.red
                      : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "700"
                }}>
                {4}
              </TextHandler>
           
              <TextHandler
                style={{
                  color:
                    !answers.status_of_anti_social_institutions_after_our_center_establishment
                      ? COLORS.red
                      : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "900"
                }}>
                 {'•'}

              </TextHandler>

            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>{t('BASTI_Q4')}</TextHandler>
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
                value: 'Inactive',
                label: 'BASTI_Q4_OPT1',
              },
              {
                key: 2,
                value: 'Active',
                label: 'BASTI_Q4_OPT2',
              },
              {
                key: 3,
                value: ' As before only',
                label: 'BASTI_Q4_OPT3',
              },
            ]}
            valueProp={
              answers.status_of_anti_social_institutions_after_our_center_establishment
            }
            onValueChange={item => {
              setAnswers({
                ...answers,
                status_of_anti_social_institutions_after_our_center_establishment:
                  item,
              });
            }}
          />
        </View>

        {/* QA5 - our_beneficiaries_also_take_benefits_from_other_organisations */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            
              <TextHandler
                style={{
                  color:
                    !answers.our_beneficiaries_also_take_benefits_from_other_organisations
                      ? COLORS.red
                      : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "700"
                }}>
                {5}
              </TextHandler>
              <TextHandler
                style={{
                  color:
                    !answers.our_beneficiaries_also_take_benefits_from_other_organisations
                      ? COLORS.red
                      : COLORS.black,
                  textAlign: 'center',
                  fontWeight : "900"
                }}>
                {'•'}

              </TextHandler>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>{t('BASTI_Q5')}</TextHandler>
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
              valueProp={
                answers.our_beneficiaries_also_take_benefits_from_other_organisations
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  our_beneficiaries_also_take_benefits_from_other_organisations:
                    item,
                });
              }}
            />
          </View>
        </View>

        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            
              <TextHandler
                style={{
                  color:
                    answers.total_population_of_the_basti?.hindu &&
                    answers.total_population_of_the_basti?.other
                      ? COLORS.black
                      : COLORS.red,
                  textAlign: 'center',
                  fontWeight : "700"
                }}>
                {6}
              </TextHandler>

              <TextHandler
                style={{
                  color:
                    answers.total_population_of_the_basti?.hindu &&
                    answers.total_population_of_the_basti?.other
                      ? COLORS.black
                      : COLORS.red,
                  textAlign: 'center',
                  fontWeight : "700"
                }}>
                 {'•'}

              </TextHandler>

            <View

              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}>
              <TextHandler style={styles.question}>
                {t('CENTER_Q23')}
              </TextHandler>
            </View>
          </View>

          <View style={{marginTop: 10}}>
            <TextHandler
              style={{
                color: 'black',
              }}>
              {t('HINDU')}
            </TextHandler>
            <Input
              type={'numeric'}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  total_population_of_the_basti: {
                    ...answers.total_population_of_the_basti,
                    hindu: text,
                  },
                });
              }}
              value={answers.total_population_of_the_basti?.hindu}
              empty={!answers.total_population_of_the_basti?.hindu}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
            <TextHandler
              style={{
                color: 'black',
                marginTop: 10,
              }}>
              {t('OTHERS')}
            </TextHandler>
            <Input
              type={'numeric'}
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                setAnswers({
                  ...answers,
                  total_population_of_the_basti: {
                    ...answers.total_population_of_the_basti,
                    other: text,
                  },
                });
              }}
              value={answers.total_population_of_the_basti?.other}
              empty={!answers.total_population_of_the_basti?.other}
              message={''}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
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
