import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useRef, useState} from 'react';
import {
  Header,
  TextHandler,
  Button,
  CustomSnackBar,
} from '../../components/index';
import {screenWidth} from '../../libs';
import {COLORS} from '../../utils/colors';
import PhoneInput from 'react-native-phone-number-input';
import {STRINGS} from '../../constants/strings';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ROUTES} from '../../navigation/RouteConstants';
import {Input} from '../../components/Input';
import {images} from '../../assets';
import {Login} from '../../networking/API.controller';
import {useDispatch} from 'react-redux';
import {ACTION_CONSTANTS} from '../../redux/actions/actions';
import LoaderIndicator from '../../components/Loader';
import {FAIcons, ADIcons} from '../../libs/VectorIcons';
import LocalizationContext from '../../context/LanguageContext';

export default function LoginScreen() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState({visible: false, message: ''});
  const dispatch = useDispatch();
  const [dataLoading, setDataLoading] = useState(false);
  const {t} = useContext(LocalizationContext);

  const GetOTP = async () => {
    if (!phone || phone.length < 10) {
      return setError({visible: true, message: 'Invalid phone number'});
    }
    setDataLoading(true);
    let data = {mobile: phone};
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
    navigate(ROUTES.AUTH.OTPSCREEN, data);
    setDataLoading(false);
  };

  return (
    <View style={styles.container}>
      <LoaderIndicator loading={dataLoading} />

      <View style={{flex: 0.2}}>
        <Header
          onPressBack={goBack}
          title={`${t('VOLUNTEER')} ${t('LOGIN')}`}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          padding: 25,
          paddingTop: 60,
          justifyContent: 'space-between',
        }}>
        <CustomSnackBar
          visible={error.visible}
          message={error.message}
          onDismissSnackBar={() =>
            setError({...error, message: '', visible: false})
          }
        />
        <View style={{flex: 1}}>
          <TextHandler style={styles.title}>
            {t('ENTER_PHONE_NUMBER_TO_CONTIUE')}
          </TextHandler>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: 10,
                minHeight: 50,
                marginVertical: 10,
                borderLeftColor: COLORS.orange,
                borderTopColor: COLORS.orange,
                borderBottomColor: COLORS.orange,
                borderWidth: 1,
                borderRightWidth: 0,
                backgroundColor: COLORS.lightOrange,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={images.indianFlag}
                style={{
                  height: 20,
                  width: 20,
                }}
              />
            </View>
            <Input
              type={'numeric'}
              placeholder="Phone"
              number={10}
              name="phone"
              onChangeText={text => {
                setPhone(text);
              }}
              value={phone}
              message={error}
              containerStyle={{
                alignItems: 'center',
                minWidth: screenWidth * 0.5,
              }}
            />
          </View>

          <TextHandler style={{fontSize: 14, textAlign: 'center'}}>
            {t('SIX_DIGIT_CODE')}
          </TextHandler>
        </View>
        <Button
          title={t('REQUEST_OTP')}
          onPress={() => GetOTP()}
          // onPress={() => navigate(ROUTES.AUTH.OTPSCREEN, {mobile: phone})}
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
  title: {
    fontSize: 17,
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
    textTransform: 'capitalize',
  },
});
