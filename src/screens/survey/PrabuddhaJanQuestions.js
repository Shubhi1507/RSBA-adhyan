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
import {BASE_URL} from '../../networking';
import LoaderIndicator from '../../components/Loader';

export default function PrabuddhaJanQuestions() {
  const dispatch = useDispatch();
  const store = useSelector(state => state?.surveyReducer);
  const {t} = useContext(LocalizationContext);

  let totalSurveys = store.totalSurveys;
  let [answers, setAnswers] = useState({
    donors_and_well_wishers_help: [],
    donors_and_well_wishers_are_connected_to_us: '',
    well_wishers_and_donors_helped_us_during_corona_crisis: '',
    influence_of_well_wishers_in_society: '',
  });
  const [error, setError] = useState({visible: false, message: ''});
  const [dataLoading, setDataLoading] = useState(false);
  const [visible, setVisible] = React.useState(false);
  let answersArrTmp =
    store?.currentSurveyData?.surveyAnswers &&
    store?.currentSurveyData?.surveyAnswers !== undefined &&
    Array.isArray(store?.currentSurveyData?.surveyAnswers) &&
    store?.currentSurveyData?.surveyAnswers.length > 0
      ? [...store?.currentSurveyData?.surveyAnswers]
      : [];
  let tmp = [...answers.donors_and_well_wishers_help];

  useEffect(() => {
    answersArrTmp.some(function (entry, i) {
      if (entry?.prabbudhJan) {
        console.log(entry.prabbudhJan);
        setAnswers(entry.prabbudhJan);
      }
    });
  }, []);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const pageNavigator = () => {
    navigate(ROUTES.AUTH.SELECTAUDIENCESCREEN);
  };

  const pageValidator = async () => {
    setDataLoading(true);
    console.log('store', store);
    let tmp = store?.currentSurveyData.currentSurveyStatus;
    const {
      donors_and_well_wishers_help,
      donors_and_well_wishers_are_connected_to_us,
      well_wishers_and_donors_helped_us_during_corona_crisis,
      influence_of_well_wishers_in_society,
    } = answers;

    let q = 4;
    let unanswered = 4;
    let new_obj;
    let ans1 =
      donors_and_well_wishers_help.length === 0 ||
      (donors_and_well_wishers_help.filter(e => e?.value === 'Other').length >
        0 &&
        !donors_and_well_wishers_help.filter(e => e?.value === 'Other')[0]
          ?.other)
        ? 0
        : 1;
    let ans2 = !donors_and_well_wishers_are_connected_to_us ? 0 : 1;
    let ans3 = !well_wishers_and_donors_helped_us_during_corona_crisis ? 0 : 1;
    let ans4 = !influence_of_well_wishers_in_society ? 0 : 1;
    let p = unanswered - (ans1 + ans2 + ans3 + ans4);

    new_obj = {
      ...tmp[7],
      attempted: true,
      completed: p === 0 ? true : false,
      disabled: false,
      totalQue: q,
      answered: q - p,
    };
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

    try {
      if (p === 0) {
        let surveydata = {
          // 'How the donors and well wishers help (Multiple choice)?'
          106: `${donors_and_well_wishers_help.map(el => {
            if (el.value === 'Other') {
              return (
                answers.donors_and_well_wishers_help.filter(
                  el => el.value === 'Other',
                )[0]?.['other'] + ' | '
              );
            }
            return el.value + ' | ';
          })}`,
          // 'How the donors and well wishers are connected to us'
          107: `${donors_and_well_wishers_are_connected_to_us?.value}`,
          // 'Have these well wishers and donors helped us during Corona crisis ?'
          108: `${well_wishers_and_donors_helped_us_during_corona_crisis?.value}`,
          // 'Influence of well wishers  in different sections of society'
          109: `${influence_of_well_wishers_in_society?.value}`,
        };
        console.log(surveydata);
        const formdata = new FormData();
        formdata.append('survey_data', JSON.stringify(surveydata));
        formdata.append('center_id', store?.currentSurveyData?.api_centre_id);
        formdata.append('audience_id', 7);
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

      setDataLoading(false);
      showModal();
    } catch (error) {
      setDataLoading(false);
      setError({visible: true, message: t('SOMETHING_WENT_WRONG')});
      console.log('error', error);
    }
  };

  const handleSelection = answer => {
    if (tmp.length === 0) {
      tmp.push(answer);
    } else {
      const isExist = tmp.some(element => answer.key === element.key);
      if (isExist) {
        // remove
        const index = tmp.findIndex(element => answer.key === element.key);
        console.log(index);
        tmp.splice(index, 1);
      } else {
        // different answ chosen
        tmp.push(answer);
      }
    }
    setAnswers({
      ...answers,
      donors_and_well_wishers_help: tmp,
    });
  };

  return (
    <View style={styles.container}>
      <LoaderIndicator loading={dataLoading} />
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
        {/* QA1 - donors_and_well_wishers_help*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  answers.donors_and_well_wishers_help.length === 0 ||
                  (answers.donors_and_well_wishers_help.filter(
                    e => e?.value === 'Other',
                  ).length > 0 &&
                    !answers.donors_and_well_wishers_help.filter(
                      e => e?.value === 'Other',
                    )[0]?.other)
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
                    answers.donors_and_well_wishers_help.length === 0 ||
                    (answers.donors_and_well_wishers_help.filter(
                      e => e?.value === 'Other',
                    ).length > 0 &&
                      !answers.donors_and_well_wishers_help.filter(
                        e => e?.value === 'Other',
                      )[0]?.other)
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
                {t('INFLUENTIAL_PEOPELE_Q1')}
              </TextHandler>
            </View>
          </View>

          {[
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
              value: 'Other',
              label: 'INFLUENTIAL_PEOPELE_Q1_OPT3',
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
                    answers.donors_and_well_wishers_help.filter(
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
          {answers.donors_and_well_wishers_help.filter(
            item => item.value === 'Other',
          ).length > 0 && (
            <Input
              placeholder={`${t('ENTER_ANSWER')}`}
              name="any"
              onChangeText={text => {
                let tmp = [...answers.donors_and_well_wishers_help];
                tmp.forEach((el, index) => {
                  if (el.value === 'Other') {
                    let newans = {...el, other: text};
                    tmp.splice(index, 1, newans);
                  }
                });
                setAnswers({
                  ...answers,
                  donors_and_well_wishers_help: tmp,
                });
              }}
              value={
                answers.donors_and_well_wishers_help.filter(
                  el => el.value === 'Other',
                ).length > 0
                  ? answers.donors_and_well_wishers_help.filter(
                      el => el.value === 'Other',
                    )[0]?.['other']
                  : ''
              }
              empty={
                !answers.donors_and_well_wishers_help.filter(
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

        {/* QA2-  donors_and_well_wishers_are_connected_to_us*/}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.donors_and_well_wishers_are_connected_to_us
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
                  color: !answers.donors_and_well_wishers_are_connected_to_us
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
              valueProp={answers.donors_and_well_wishers_are_connected_to_us}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  donors_and_well_wishers_are_connected_to_us: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA - well_wishers_and_donors_helped_us_during_corona_crisis */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor:
                  !answers.well_wishers_and_donors_helped_us_during_corona_crisis
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
                    !answers.well_wishers_and_donors_helped_us_during_corona_crisis
                      ? COLORS.white
                      : COLORS.black,
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
              valueProp={
                answers.well_wishers_and_donors_helped_us_during_corona_crisis
              }
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  well_wishers_and_donors_helped_us_during_corona_crisis: item,
                });
              }}
            />
          </View>
        </View>

        {/* QA4 */}
        <View>
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View
              style={{
                backgroundColor: !answers.influence_of_well_wishers_in_society
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
                  color: !answers.influence_of_well_wishers_in_society
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
                  label: 'INFLUENTIAL_PEOPELE_Q4_OPT1',
                },
                {
                  key: 2,
                  value: 'Not much',
                  label: 'INFLUENTIAL_PEOPELE_Q4_OPT2',
                },
                {
                  key: 3,
                  value: 'Only in certain sections',
                  label: 'INFLUENTIAL_PEOPELE_Q4_OPT3',
                },
              ]}
              valueProp={answers.influence_of_well_wishers_in_society}
              onValueChange={item => {
                setAnswers({
                  ...answers,
                  influence_of_well_wishers_in_society: item,
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
