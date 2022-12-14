import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import {ROUTES} from './RouteConstants';
import SplashScreen from '../screens/SplashScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import VolunteerSignUpScreen from '../screens/auth/VolunteerSignUpScreen';
import VolunteerLoginScreen from '../screens/auth/CenterDetailsOneScreen';
import CenterDetailsOneScreen from '../screens/auth/CenterDetailsOneScreen';
import CenterDetailsTwoScreen from '../screens/auth/CenterDetailsTwoScreen';
import SelectAudienceScreen from '../screens/auth/SelectAudienceScreen';
import StudentEnrollmentScreen from '../screens/auth/StudentEnrollmentScreen';

const AuthStack = createStackNavigator();

export function Auth() {
  return (
    <AuthStack.Navigator initialRouteName={ROUTES.AUTH.SPLASHSCREEN}>
      <AuthStack.Screen
        name={ROUTES.AUTH.SPLASHSCREEN}
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={ROUTES.AUTH.LOGINSCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={ROUTES.AUTH.OTPSCREEN}
        component={OTPScreen}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name={ROUTES.AUTH.VOLUNTEERSIGNUPSCREEN}
        component={VolunteerSignUpScreen}
        options={{headerShown: false}}
      />

      {/* <AuthStack.Screen
        name={ROUTES.AUTH.CENTREDETAILSONESCREEN}
        component={CenterDetailsOneScreen}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name={ROUTES.AUTH.VOLUNTEERPARENTALORGSCREEN}
        component={CenterDetailsTwoScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={ROUTES.AUTH.SELECTAUDIENCESCREEN}
        component={SelectAudienceScreen}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name={ROUTES.AUTH.STUDENTENROLLMENTSCREEN}
        component={StudentEnrollmentScreen}
        options={{headerShown: false}}
      /> */}
    </AuthStack.Navigator>
  );
}
