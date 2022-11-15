import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React from 'react';
import {screenWidth} from '../../libs';
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
import DatePicker from 'react-native-datepicker';
import {ROUTES} from '../../navigation/RouteConstants';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

export default function SelectAudienceScreen() {
  let [selectedAudience, setAudience] = useState('');
  const [isSurveyCompleted, setisSurveyCompleted] = useState(false);
  const store = useSelector(state => state);
  const dispatch = useDispatch();
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
        key: `Student's Parents (Past Students)`,
        value: `Student's Parents (Past Students)`,
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: `Student's Parents (Current Students)`,
        value: `Student's Parents (Current Students)`,
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Past Student',
        value: 'Past Student',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Current Student',
        value: 'Current Student',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Teacher',
        value: 'Teacher',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Kendra Sanchalak',
        value: 'Kendra Sanchalak',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Basti',
        value: 'Basti',
        disabled: false,
        checked: false,
        completed: false,
      },
      {
        key: 'Prabuddha Jan',
        value: 'Prabuddha Jan',
        disabled: false,
        checked: false,
        completed: false,
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
    console.log('store', store);
    checkIfSurveyisCompleted();
  }, [store]);

  const checkIfSurveyisCompleted = () => {
    let tmp = store?.surveyReducer?.surveyStatus;
    console.log('tmp', tmp);
    let arr = [];
    if (tmp && Array.isArray(tmp) && tmp.length > 0) {
      tmp.forEach(el => {
        if (el.completed != null) {
          arr.push(el.completed);
        }
      });
    }
    console.log('result', arr, checker(arr));
    setisSurveyCompleted(checker(arr));
  };

  const checker = arr => {
    if (arr.length > 1) {
      return arr.every(Boolean);
    } else {
    }
    return false;
  };

  const pageNavigator = () => {
    const {CENTRES} = miscControllers;
    if (!selectedAudience) {
      return setError({
        visible: true,
        message: 'Please select an audience',
        type: 'error',
      });
    }

    dispatch({type: ACTION_CONSTANTS.UPDATE_SURVEY_STATUS, payload: CENTRES});

    switch (selectedAudience) {
      case CENTRES[0].value:
        if (CENTRES[0].disabled) {
          return setError({
            visible: true,
            type: 'ok',
            message: 'Already submitted',
          });
        } else return navigate(ROUTES.AUTH.PURV_ABHIBHAVAK_SCREEN);
      case CENTRES[1].value:
        if (CENTRES[1].disabled) {
          return setError({
            visible: true,
            type: 'ok',
            message: 'Already submitted',
          });
        } else return navigate(ROUTES.AUTH.VARTAAMAAN_ABHIBHAVAK_SCREEN);

      case CENTRES[2].value:
        if (CENTRES[2].disabled) {
          return setError({
            visible: true,
            type: 'ok',
            message: 'Already submitted',
          });
        } else return navigate(ROUTES.AUTH.PASTSTUDENTQUESTIONS);
        break;
      case CENTRES[3].value:
        if (CENTRES[3].disabled) {
          return setError({
            visible: true,
            type: 'ok',
            message: 'Already submitted',
          });
        } else return navigate(ROUTES.AUTH.PRESENTSTUDENTQUESTIONS);
        break;
      case CENTRES[4].value:
        if (CENTRES[4].disabled) {
          return setError({
            visible: true,
            type: 'ok',
            message: 'Already submitted',
          });
        } else return navigate(ROUTES.AUTH.TEACHERQUESTONSSCREEN);
      case CENTRES[5].value:
        if (CENTRES[5].disabled) {
          return setError({
            visible: true,
            type: 'ok',
            message: 'Already submitted',
          });
        } else return navigate(ROUTES.AUTH.KENDRASANCHALAKSCREEN);
      case CENTRES[6].value:
        if (CENTRES[6].disabled) {
          return setError({
            visible: true,
            type: 'ok',
            message: 'Already submitted',
          });
        } else return navigate(ROUTES.AUTH.BASTIQUESTIONS);
      case CENTRES[7].value:
        if (CENTRES[7].disabled) {
          return setError({
            visible: true,
            type: 'ok',
            message: 'Already submitted',
          });
        } else return navigate(ROUTES.AUTH.PRABUDDHAJANQUESTIONS);
      default:
        break;
    }

    // navigate(ROUTES.AUTH.SURVEYSCREEN);
  };
  const submitSurvey = () => {
    dispatch({type: ACTION_CONSTANTS.ADD_COMPLETED_SURVEY_COUNT});
    navigate(ROUTES.AUTH.DASHBOARDSCREEN);
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
            {STRINGS.LOGIN.AUDIENCE}
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
            {STRINGS.LOGIN.AUDIENCE}
          </TextHandler>

          <FlatList
            data={
              store?.surveyReducer?.surveyStatus &&
              store?.surveyReducer?.surveyStatus.length > 0
                ? store?.surveyReducer?.surveyStatus
                : miscControllers.CENTRES
            }
            renderItem={({item, index}) => {
              return (
                <CustomCheckbox
                  label={item.value}
                  status={selectedAudience === item.value}
                  disabled={item.disabled}
                  onPress={() => {
                    if (!item.disabled) {
                      let tmp = [...miscControllers.CENTRES];
                      let new_obj = {...item, checked: !item.checked};
                      tmp.splice(index, 1, new_obj);
                      setAudience(item.value);
                      setmisControllers({...miscControllers, CENTRES: tmp});
                    }
                  }}
                />
              );
            }}
          />
        </View>

        <Button
          title={isSurveyCompleted ? 'Save and Review' : 'Next'}
          onPress={
            isSurveyCompleted ? () => submitSurvey() : () => pageNavigator()
          }
          ButtonContainerStyle={{
            marginVertical: 17,
            alignItems: 'center',
            textAlign: 'center',
          }}
        />
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
