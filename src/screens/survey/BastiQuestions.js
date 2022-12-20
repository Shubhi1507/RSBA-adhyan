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

export default function BastiQuestions() {
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);
  let totalSurveys = store.totalSurveys;
  const dispatch = useDispatch();
  let [answers, setAnswers] = useState({
    other_organizations_active: '',
    activities_conducted_by_these_organisations: [],
    involved_in_anti_social_activities: '',
    status_of_anti_social_institutions_after_our_center_establishment: '',
    our_beneficiaries_also_take_benefits_from_other_organisations: '',
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

  const pageValidator = () => {
    console.log('store', store);
    let tmp = store?.currentSurveyData.currentSurveyStatus;
    let new_obj;
    const {
      other_organizations_active,
      activities_conducted_by_these_organisations,
      involved_in_anti_social_activities,
      status_of_anti_social_institutions_after_our_center_establishment,
      our_beneficiaries_also_take_benefits_from_other_organisations,
    } = answers;
    let q = 5;
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
      !other_organizations_active ||
      activities_conducted_by_these_organisations.length == 0 ||
      !involved_in_anti_social_activities ||
      !status_of_anti_social_institutions_after_our_center_establishment ||
      !our_beneficiaries_also_take_benefits_from_other_organisations
    ) {
      new_obj = {
        ...tmp[6],
        attempted: true,
        completed: false,
        disabled: false,
        totalQue: q,
        answered: p,
      };
    } else {
      new_obj = {
        ...tmp[6],
        attempted: true,
        completed: true,
        disabled: true,
        totalQue: q,
        answered: p,
      };
    }
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

    console.log('payload basti', payload);
    dispatch({type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY, payload: payload});
    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
    showModal();
  };

  return (
    <View style={styles.container}>
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
              valueProp={answers.other_organizations_active}
              onValueChange={item => {
                setAnswers({...answers, other_organizations_active: item});
              }}
            />
            {answers.other_organizations_active?.key == 1 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  setAnswers({
                    ...answers,
                    other_organizations_active: {
                      ...answers.other_organizations_active,
                      other: text,
                    },
                  });
                }}
                value={answers.other_organizations_active?.other}
                message={''}
                containerStyle={{
                  alignItems: 'center',
                  minWidth: screenWidth * 0.25,
                }}
              />
            )}
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
             <TextHandler style={styles.question}>
                {t('BASTI_Q2')}
              </TextHandler>
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
              // {
              //   key: 5,
              //   value: 'Self-support',
              //   label: 'BASTI_Q2_OPT5',
              // },
              {
                key: 6,
                value: 'Others',
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
                    let tmp = [
                      ...answers.activities_conducted_by_these_organisations,
                    ];

                    if (tmp.length > 0) {
                      let j = tmp.filter(element => element.key === 999);
                      if (j.length > 0) {
                        tmp = [];
                        tmp.push(el);
                        setAnswers({
                          ...answers,
                          activities_conducted_by_these_organisations: tmp,
                        });
                      } else {
                        tmp.forEach(function (item, index1) {
                          if (item.value === el.value) {
                            let tmp = [
                              ...answers.activities_conducted_by_these_organisations,
                            ];
                            tmp.splice(index1, 1);
                            setAnswers({
                              ...answers,
                              activities_conducted_by_these_organisations: tmp,
                            });
                          } else {
                            let tmp = [
                              ...answers.activities_conducted_by_these_organisations,
                            ];
                            tmp.push(el);
                            setAnswers({
                              ...answers,
                              activities_conducted_by_these_organisations: tmp,
                            });
                          }
                        });
                      }
                    } else {
                      tmp.push(el);
                      setAnswers({
                        ...answers,
                        activities_conducted_by_these_organisations: tmp,
                      });
                    }
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
              item => item.value === 'Others',
            ).length > 0 && (
              <Input
                placeholder={`${t('ENTER_ANSWER')}`}
                name="any"
                onChangeText={text => {
                  let tmp = [
                    ...answers.activities_conducted_by_these_organisations,
                  ];
                  tmp.forEach((el, index) => {
                    if (el.value === 'Others') {
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
                    el => el.value === 'Others',
                  ).length > 0
                    ? answers.activities_conducted_by_these_organisations.filter(
                        el => el.value === 'Others',
                      )[0]?.['other']
                    : ''
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
             <TextHandler style={styles.question}>
                {t('BASTI_Q3')}
              </TextHandler>
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
            message={''}
            containerStyle={{
              alignItems: 'center',
              minWidth: screenWidth * 0.25,
            }}
          />
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
                {t('BASTI_Q4')}
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
                {t('BASTI_Q5')}
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
