import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import {ROUTES} from './RouteConstants';
import SplashScreen from '../screens/SplashScreen';
import OTPScreen from '../screens/auth/OTPScreen';

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
    </AuthStack.Navigator>
  );
}
