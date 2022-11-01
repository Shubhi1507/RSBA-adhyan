import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../utils/colors';
import {navigate} from '../navigation/NavigationService';
import {ROUTES} from '../navigation/RouteConstants';
import {connecttoFBD} from '../networking/FirebaseAPI.controller';

export default function SplashScreen() {
  useEffect(() => {
    connecttoFBD();
  }, []);

  return (
    <View style={{backgroundColor: COLORS.backgroundColor, flex: 1}}>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flex: 0.8,
          marginTop: 60,
        }}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: '50%', height: '40%'}}
          resizeMode={'contain'}></Image>

        <Text
          style={{
            color: COLORS.fontColor,
            fontWeight: '500',
            fontSize: 22,
            marginTop: 20,
            textAlign: 'center',
          }}>
          Rashtriya Sewa Bharati Adhyan Survey
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigate(ROUTES.AUTH.LOGINSCREEN)}
          style={{
            backgroundColor: COLORS.buttonColor,
            alignSelf: 'center',
            borderRadius: 6,
            width: '80%',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text
            style={{
              alignItems: 'center',
              color: 'white',
              fontWeight: '500',
              fontSize: 18,
              textAlign: 'center',
            }}>
            Volunteer Login
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              color: COLORS.black,
              textAlign: 'center',
              fontSize: 16,
              fontWeight: '500',
            }}>
            New Volunteer ?
          </Text>

          <TouchableOpacity
            onPress={() => navigate(ROUTES.AUTH.VOLUNTEERSIGNUPSCREEN)}>
            <Text
              style={{
                color: COLORS.buttonColor,
                fontWeight: '700',
                fontSize: 16,
              }}>
               {" "}Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
