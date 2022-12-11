import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';
import React from 'react';
import {
  Button,
  CustomCheckbox,
  CustomSnackBar,
  Header,
  SurveyCompletedModal,
  TextHandler,
} from '../../components/index';
import {COLORS} from '../../utils/colors';
import {goBack, navigate} from '../../navigation/NavigationService';
import {useState} from 'react';
import {STRINGS} from '../../constants/strings';
import {ROUTES} from '../../navigation/RouteConstants';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {filterOutIncompleteSurveys, FindAndUpdate} from '../../utils/utils';
import LocalizationContext from '../../context/LanguageContext';
import {useContext} from 'react';
import {ADIcons, EnIcons} from '../../libs/VectorIcons';

export default function SelectAudienceScreen() {
  let [selectedAudience, setAudience] = useState('');
  const {t} = useContext(LocalizationContext);
  const [isSurveyCompleted, setisSurveyCompleted] = useState(false);
  const store = useSelector(state => state?.surveyReducer);
  let totalSurveys = store.totalSurveys;
  const dispatch = useDispatch();
  let CENTRES_STATUS_FOR_ANEW_SURVEY = [
    {
      key: 1,
      value: `Student's Parents (Current Students)`,
      label: 'STUDENTS_PARENTS_CURRENT_STUDENTS',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 13,
    },
    {
      key: 2,
      value: `Student's Parents (Past Students)`,
      label: 'STUDENTS_PARENTS_PAST_STUDENTS',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 11,
    },
    {
      key: 3,
      value: 'Current Student',
      label: 'CURRENT_STUDENT',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 19,
    },
    {
      key: 4,
      value: 'Past Student',
      label: 'PAST_STUDENT',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 16,
    },
    {
      key: 5,
      value: 'Teacher',
      label: 'TEACHER',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 12,
    },
    {
      key: 6,
      value: 'Kendra Sanchalak',
      label: 'KENDRA_SANCHALAK',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 10,
    },
    {
      key: 7,
      value: 'Basti',
      label: 'BASTI',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 5,
    },
    {
      key: 8,
      value: 'Influential Persons from the Basti',
      label: 'PRABUDDHA_JAN',
      disabled: false,
      attempted: false,
      completed: false,
      totalQue: 4,
    },
  ];
  const [miscControllers, setmisControllers] = useState({
    CLASS_FREQUENCY: [
      {
        key: 'Daily',
        value: 'Daily',
      },
      {
        key: 'BiWeekly',
        value: 'Biweekly',
      },
      {
        key: 'Weekly',
        value: 'Weekly',
      },
    ],
    CENTRES: [
      {
        key: `Student's Parents (Current Students)`,
        value: `Student's Parents (Current Students)`,
        label: 'STUDENTS_PARENTS_CURRENT_STUDENTS',
        disabled: false,
        attempted: false,
        completed: false,
        totalQue: 13,
      },
      {
        key: `Student's Parents (Past Students)`,
        value: `Student's Parents (Past Students)`,
        label: 'STUDENTS_PARENTS_PAST_STUDENTS',
        disabled: false,
        attempted: false,
        completed: false,
        totalQue: 11,
      },
      {
        key: 'Current Student',
        value: 'Current Student',
        label: 'CURRENT_STUDENT',
        disabled: false,
        attempted: false,
        completed: false,
        totalQue: 19,
      },
      {
        key: 'Past Student',
        value: 'Past Student',
        label: 'PAST_STUDENT',
        disabled: false,
        attempted: false,
        completed: false,
        totalQue: 16,
      },
      {
        key: 'Teacher',
        value: 'Teacher',
        label: 'TEACHER',
        disabled: false,
        attempted: false,
        completed: false,
        totalQue: 12,
      },
      {
        key: 'Kendra Sanchalak',
        value: 'Kendra Sanchalak',
        label: 'KENDRA_SANCHALAK',
        disabled: false,
        attempted: false,
        completed: false,
        totalQue: 10,
      },
      {
        key: 'Basti',
        value: 'Basti',
        label: 'BASTI',
        disabled: false,
        attempted: false,
        completed: false,
        totalQue: 5,
      },
      {
        key: 'Influential Persons from the Basti',
        value: 'Influential Persons from the Basti',
        label: 'PRABUDDHA_JAN',
        disabled: false,
        attempted: false,
        completed: false,
        totalQue: 4,
      },
    ],
  });

  const [error, setError] = useState({
    visible: false,
    message: '',
    type: 'error',
  });
  const [visible, setVisible] = React.useState(false);

  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  useEffect(() => {
    checkIsSurveyCompleted();
  }, [store]);

  const checkIsSurveyCompleted = () => {
    let flag = true;
    let tmp = [...store.currentSurveyData?.currentSurveyStatus];
    tmp.forEach(el => {
      if (el.completed == false) {
        console.log('el', el);
        flag = false;
        return;
      }
    });
    setisSurveyCompleted(flag);
  };
  const pageNavigator = audience => {
    let CENTRES = CENTRES_STATUS_FOR_ANEW_SURVEY;
    switch (audience) {
      case CENTRES[0].value:
        return navigate(ROUTES.AUTH.VARTAAMAAN_ABHIBHAVAK_SCREEN);
      case CENTRES[1].value:
        return navigate(ROUTES.AUTH.PURV_ABHIBHAVAK_SCREEN);
      case CENTRES[2].value:
        return navigate(ROUTES.AUTH.PRESENTSTUDENTQUESTIONS);
      case CENTRES[3].value:
        return navigate(ROUTES.AUTH.PASTSTUDENTQUESTIONS);
      case CENTRES[4].value:
        return navigate(ROUTES.AUTH.TEACHERQUESTONSSCREEN);
      case CENTRES[5].value:
        return navigate(ROUTES.AUTH.KENDRASANCHALAKSCREEN);
      case CENTRES[6].value:
        return navigate(ROUTES.AUTH.BASTIQUESTIONS);
      case CENTRES[7].value:
        return navigate(ROUTES.AUTH.PRABUDDHAJANQUESTIONS);
      default:
        break;
    }

    // navigate(ROUTES.AUTH.SURVEYSCREEN);
  };
  const submitSurvey = () => {
    let tmp = store?.currentSurveyData;
    let payload = {};
    if (tmp?.release_date) {
      payload = {
        ...store?.currentSurveyData,
        isSaved: true,
        updatedAt: new Date().toString(),
      };
    } else {
      payload = {
        ...store?.currentSurveyData,
        isSaved: true,
        updatedAt: new Date().toString(),
        release_date: new Date(
          new Date().setTime(new Date().getTime() + 48 * 60 * 60 * 1000),
        ).toString(),
      };
      dispatch({
        type: ACTION_CONSTANTS.UPDATE_CURRENT_SURVEY,
        payload: payload,
      });
    }
    let tmp1 = FindAndUpdate(totalSurveys, payload);
    console.log('final payload', payload);

    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_ARRAY, payload: tmp1});
    navigate(ROUTES.AUTH.DASHBOARDSCREEN);
    setError({
      ...error,
      message: 'Survey submitted succesfully',
      visible: true,
      type: 'ok',
    });
  };

  const BackRefPageNavigator = () => {
    Alert.alert('Go to', '', [
      {
        text: 'Dashboard',
        onPress: () => {
          navigate(ROUTES.AUTH.DASHBOARDSCREEN);
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Previous Screen',
        onPress: () => {
          goBack();
        },
      },
    ]);
  };

  const statusColorGrader = (p, q) => {
    let j = parseInt((p / q) * 100);
    switch (j) {
      case 0 < j < 50:
        return COLORS.error;
        break;
      case 50 < j < 100:
        return COLORS.orange;
      case j == 100:
        return COLORS.black;
      default:
        return COLORS.black;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.2}}>
        <Header
          title={t('SELECT_AUDIENCE')}
          onPressBack={BackRefPageNavigator}
        />
      </View>
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        type={error.type}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <SurveyCompletedModal visible={visible} hideModal={hideModal} />
      <ScrollView style={{flex: 1, paddingHorizontal: 20}}>
        <View>
          <TextHandler
            style={{
              color: 'black',
              fontWeight: '600',
              marginVertical: 20,
              fontSize: 20,
              textAlign: 'left',
            }}>
            {t('SELECT_AUDIENCE')}
          </TextHandler>

          <FlatList
            data={
              store.currentSurveyData?.currentSurveyStatus &&
              store.currentSurveyData?.currentSurveyStatus.length > 0
                ? store.currentSurveyData?.currentSurveyStatus
                : []
            }
            style={{flex: 1}}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    marginVertical: 9,
                    backgroundColor: COLORS.tile,
                    flexDirection: 'row',
                    padding: 10,
                    justifyContent: 'center',
                    // height: 8,
                  }}
                  onPress={() => {
                    let tmp = [...miscControllers.CENTRES];
                    let new_obj = {...item, attempted: !item.attempted};
                    tmp.splice(index, 1, new_obj);
                    setAudience(item.value);
                    pageNavigator(item.value);
                  }}>
                  {/* marker */}
                  <View style={{flex: 0.15, paddingTop: 8}}>
                    {selectedAudience === item.value ? (
                      <ADIcons
                        name="checkcircleo"
                        color={COLORS.blue}
                        size={20}
                      />
                    ) : (
                      <EnIcons name="circle" color={COLORS.blue} size={20} />
                    )}
                  </View>
                  {/* other labels */}
                  <View style={{flex: 1}}>
                    <View style={{flex: 0.8, flexDirection: 'row'}}>
                      <View
                        style={{
                          flex: 1,
                          paddingVertical: 5,
                        }}>
                        <TextHandler
                          style={{
                            fontSize: 16,
                            fontWeight: '400',
                            lineHeight: 22,
                            color:
                              selectedAudience === item.value
                                ? COLORS.blue
                                : COLORS.black,
                          }}>
                          {t(item.label)}
                        </TextHandler>
                      </View>
                      <View style={{flex: 0.2, paddingTop: 8}}>
                        <TextHandler
                          style={{
                            fontSize: 16,
                            fontWeight: '400',
                            lineHeight: 22,
                            textAlign: 'center',
                            color: item?.answered
                              ? item?.answered < item?.totalQue
                                ? COLORS.orange
                                : COLORS.green
                              : COLORS.black,
                          }}>
                          {item.attempted
                            ? item?.answered
                              ? item?.answered + '/' + item?.totalQue
                              : item.totalQue
                            : ''}
                        </TextHandler>
                      </View>
                    </View>

                    <View style={{flex: 0.5}}>
                      <TextHandler
                        style={{
                          fontSize: 12,
                          fontWeight: '400',
                          lineHeight: 22,
                          color: COLORS.black,
                        }}>
                        {item?.answered
                          ? item.answered === item.totalQue
                            ? t('COMPLETED_SURVEYS')
                            : item.totalQue -
                                item?.answered +
                                ' ' +
                                t('QUESTIONS') +
                                ' ' +
                                t('LEFT') || 0
                          : item.totalQue +
                            ' ' +
                            t('QUESTIONS') +
                            ' ' +
                            t('LEFT')}
                      </TextHandler>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        {isSurveyCompleted && (
          <Button
            title={'Save and Review'}
            onPress={() => submitSurvey()}
            ButtonContainerStyle={{
              marginVertical: 17,
              alignItems: 'center',
              textAlign: 'center',
            }}
          />
        )}
      </ScrollView>
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
