import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import {COLORS} from '../../utils/colors';
import {Header, TextHandler, Button} from '../../components/index';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {goBack, navigate} from '../../navigation/NavigationService';
import {screenWidth} from '../../libs';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {STRINGS} from '../../constants/strings';
import { ROUTES } from '../../navigation/RouteConstants';

export default function OTPScreen() {
  const [counter, setCounter] = React.useState(60);
  const [code, setCode] = useState('');

  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

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
            <ADIcons name="left" color={COLORS.white} size={20} />
          </TouchableOpacity>
          <Image
            source={require('../../assets/user.png')}
            style={{tintColor: COLORS.white}}
          />
        </View>
        <View style={{flex: 0.65}}>
          <Text style={{color: COLORS.white, fontWeight: '500', fontSize: 16}}>
            Volunteer Login
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 0.18}}>
        <Header children={HeaderContent()} />
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
              {STRINGS.LOGIN.OTP_SENT}
            </TextHandler>
            <TextHandler
              style={{
                fontWeight: '600',
                paddingVertical: 10,
              }}>
              +919876543210
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

        <Button title={'Submit'} onPress={() => {navigate(ROUTES.AUTH.VOLUNTEERWELCOMESCREEN)}} />
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
