import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {
  Header,
  TextHandler,
  Button,
  DropDown,
  CustomSnackBar,
} from '../../components/index';
import {screenWidth} from '../../libs';
import {COLORS} from '../../utils/colors';
import {Input} from '../../components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ROUTES} from '../../navigation/RouteConstants';
import {useEffect} from 'react';
import {getListofStates, Login} from '../../networking/API.controller';
import {useDispatch, useSelector} from 'react-redux';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import LoaderIndicator from '../../components/Loader';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';

export default function VolunteerSignUpScreen() {
  const store = useSelector(state => state.RegionReducer);
  const dispatch = useDispatch();
  const [error, setError] = useState({visible: false, message: ''});

  const [volunteerInfo, setvolunteerInfo] = useState({
    name: '',
    state_pranth: '',
    phone: '',
  });
  const [dataLoading, setDataLoading] = useState(false);
  const [miscControllers, setMiscControllers] = useState({
    state_pranth: false,
  });

  useEffect(() => {
    getListofStatesFunction();
  }, []);

  useEffect(() => {}, [store.bastiList]);

  const getListofStatesFunction = async () => {
    setDataLoading(true);
    const data = await getListofStates();
    if (data && data.data && Array.isArray(data.data)) {
      let temp = data.data;
      let states = [];
      temp.forEach(el => {
        states.push({key: el.id, value: el.name});
      });
      console.log('states>', states);
      dispatch({
        type: ACTION_CONSTANTS.UPDATE_STATE_LIST,
        payload: states,
      });
    } else {
      dispatch({type: ACTION_CONSTANTS.CLEAR_STATE_LIST});
    }
    setDataLoading(false);
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
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 19}}>
            Volunteer SignUp
          </Text>
        </View>
      </View>
    );
  };

  const signUp = async () => {
    const {name, phone, state_pranth} = volunteerInfo;
    if (!name) {
      return setError({
        visible: true,
        message: 'Please enter full name',
      });
    }
    if (!state_pranth) {
      return setError({
        visible: true,
        message: 'Please select a State/ Pranth',
      });
    }
    if (!phone || phone.length < 10) {
      return setError({
        visible: true,
        message: 'Please enter mobile number',
      });
    }
    let data = {mobile: phone, state_id: state_pranth?.key, name};

    setDataLoading(true);
    let response = await Login(data);
    console.log('Login', response);
    let payload = {
      access_token: response.access_token,
      expires_in: response.expires_in,
      startedAt: new Date().getTime(),
    };
    dispatch({
      type: ACTION_CONSTANTS.LOGIN_DATA_UPDATE,
      payload: payload,
    });
    setDataLoading(false);
    navigate(ROUTES.AUTH.OTPSCREEN, data);
  };

  return (
    <View style={styles.container}>
      <LoaderIndicator loading={dataLoading} />
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
      </View>

      <KeyboardAwareScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{
          marginTop: 50,
          // flexGrow:1,
          justifyContent: 'center',
        }}>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Full Name</Text>
          <Input
            placeholder="First Name"
            name="name"
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, name: text})
            }
            value={volunteerInfo.name}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Pranth</Text>
          <DropDown
            openAnchor={() => {
              setMiscControllers({...miscControllers, state_pranth: true});
            }}
            closeAnchor={() => {
              setMiscControllers({...miscControllers, state_pranth: false});
            }}
            isFocused={miscControllers.state_pranth}
            isVisible={miscControllers.state_pranth}
            title={''}
            onSelect={item => {
              setvolunteerInfo({...volunteerInfo, state_pranth: item});
            }}
            optionsArr={store?.stateList || []}
            error={'Pranth'}
            value={volunteerInfo.state_pranth?.value}
          />
        </View>
        <View style={styles.textBox}>
          <Text style={styles.headingInput}>Phone Number</Text>
          <Input
            placeholder="Phone"
            name="phone"
            onChangeText={text =>
              setvolunteerInfo({...volunteerInfo, phone: text})
            }
            type={'numeric'}
            number={10}
            value={volunteerInfo.phone}
            message={'error'}
            containerStyle={{alignItems: 'center'}}
          />
        </View>
        <Button
          title={'Submit'}
          onPress={signUp}
          ButtonContainerStyle={{marginVertical: 20}}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  textBox: {
    // flex: 0.21,
    // alignItems: 'flex-start',
    // padding: 6,
    // justifyContent: 'flex-start',
    // textAlign: '',
  },

  headingInput: {
    color: 'black',
    fontWeight: '500',
    fontSize: 16,
    marginTop: 3,
  },

  input: {
    height: 55,
    margin: 5,
    borderWidth: 1,
    padding: 20,
    textAlign: 'left',
    color: 'black',
  },

  textInput: {
    height: 40,
    margin: 3,
    borderWidth: 1,
    padding: 10,
    textAlign: 'left',
    color: 'grey',
    marginTop: 2,
  },
});
