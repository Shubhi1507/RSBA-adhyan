import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../utils/colors';
import {
  Header,
  TextHandler,
  Button,
  CustomSnackBar,
} from '../../components/index';
import {goBack, navigate} from '../../navigation/NavigationService';
import {screenWidth} from '../../libs';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {STRINGS} from '../../constants/strings';
import {ROUTES} from '../../navigation/RouteConstants';
import {VerifyOTP} from '../../networking/API.controller';
import {useDispatch, useSelector} from 'react-redux';
import LoaderIndicator from '../../components/Loader';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import {ADIcons, FAIcons} from '../../libs/VectorIcons';
import LocalizationContext from '../../context/LanguageContext';
import {useContext} from 'react';

export default function OTPScreen({route, navigation}) {
  const store = useSelector(state => state.authReducer);
  const {t} = useContext(LocalizationContext);

  const dispatch = useDispatch();
  const [counter, setCounter] = React.useState(60);
  const [code, setCode] = useState('');
  const [error, setError] = useState({visible: false, message: ''});
  const [dataLoading, setDataLoading] = useState(false);
  const {mobile} = route.params;

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const verifyOTP = async () => {
    if (!code || code.length < 6) {
      return setError({visible: true, message: 'Invalid OTP'});
    }
    setDataLoading(true);

    console.log('mobile', mobile);
    let data = {mobile, otp: code};

    let response = await VerifyOTP(data);
    console.log(response);
    if (response?.status === 'Error') {
      setDataLoading(false);
      return setError({visible: true, message: 'Invalid OTP'});
    }
    let newUserData = {...store.userData, data: response.data};
    let newState = {...store, userData: newUserData};
    console.log('newState', newState);
    dispatch({
      type: ACTION_CONSTANTS.LOGIN_SUCCESSFUL,
      payload: newState,
    });
    navigate(ROUTES.AUTH.DASHBOARDSCREEN);
  };

  return (
    <View style={styles.container}>
      {/* <LoaderIndicator loading={dataLoading} /> */}
      <CustomSnackBar
        visible={error.visible}
        message={error.message}
        onDismissSnackBar={() =>
          setError({...error, message: '', visible: false})
        }
      />
      <View style={{flex: 0.18}}>
        <Header
          title={`${t('VOLUNTEER')} ${t('LOGIN')}`}
          onPressBack={goBack}
        />
      </View>
      <View
        style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TextHandler
            style={{
              fontSize: 20,
              fontWeight: '600',
              textAlign: 'left',
              paddingVertical: 10,
            }}>
            {STRINGS.LOGIN.ENTER_VERIFICATION_CODE}
          </TextHandler>
          <View style={{flexDirection: 'row'}}>
            <TextHandler style={{fontWeight: '300', paddingVertical: 10}}>
              {STRINGS.LOGIN.OTP_SENT} :
            </TextHandler>
            <TextHandler
              style={{
                fontWeight: '600',
                paddingVertical: 10,
              }}>
              +91{mobile}
            </TextHandler>
          </View>

          <OTPInputView
            style={{width: '80%', height: 50}}
            pinCount={6}
            // code={code}
            onCodeChanged={code => setCode(code)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
          <View
            style={{
              width: screenWidth,
              padding: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
            <TouchableOpacity>
              <TextHandler style={{color: COLORS.orange}}>
                {STRINGS.LOGIN.RESEND_OTP}
              </TextHandler>
            </TouchableOpacity>
            <TextHandler style={{color: COLORS.orange}}>
              0: {counter}
            </TextHandler>
          </View>
        </View>

        <Button
          title={'Submit'}
          onPress={() => {
            verifyOTP();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:"teal"
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: COLORS.black,
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: COLORS.black,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.blue,
  },
});
