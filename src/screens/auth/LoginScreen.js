import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import {Header, TextHandler, Button} from '../../components/index';
import {screenWidth} from '../../libs';
import {COLORS} from '../../utils/colors';
import FAIcons from 'react-native-vector-icons/FontAwesome';
import PhoneInput from 'react-native-phone-number-input';
import {STRINGS} from '../../constants/strings';
import ADIcons from 'react-native-vector-icons/AntDesign';
import {goBack, navigate} from '../../navigation/NavigationService';
import {ROUTES} from '../../navigation/RouteConstants';
import {Input} from '../../components/Input';
import {images} from '../../assets';
export default function LoginScreen() {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const phoneInput = useRef(null);

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
      <View style={{flex: 0.2}}>
        <Header children={HeaderContent()} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          padding: 25,
          paddingTop: 50,
          justifyContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <TextHandler style={{fontSize: 18, textAlign: 'center'}}>
            {STRINGS.LOGIN.ENTER_PHONE_NO}
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
            />
          </View>

          <TextHandler style={{fontSize: 12, textAlign: 'center'}}>
            {STRINGS.LOGIN.SMS_VERIFY_MSG}
          </TextHandler>
        </View>
        <Button
          title={'Request OTP'}
          onPress={() => navigate(ROUTES.AUTH.OTPSCREEN)}
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
});
