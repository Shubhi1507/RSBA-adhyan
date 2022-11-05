import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/auth/LoginScreen';
import {ROUTES} from './RouteConstants';
import SplashScreen from '../screens/SplashScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import VolunteerSignUpScreen from '../screens/auth/VolunteerSignUpScreen';
import VolunteerLoginScreen from '../screens/auth/VolunteerWelcomeScreen';
import VolunteerWelcomeScreen from '../screens/auth/VolunteerWelcomeScreen';
import VolunteerParentalOrgScreen from '../screens/auth/VolunteerParentalOrgScreen';
import VolunteerTeacherScreen from '../screens/auth/VolunteerTeacherScreen';
import StudentEnrollmentScreen from '../screens/auth/StudentEnrollmentScreen';
import SurveyScreen from '../screens/survey/SurveyScreen';

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

      <AuthStack.Screen
        name={ROUTES.AUTH.VOLUNTEERWELCOMESCREEN}
        component={VolunteerWelcomeScreen}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name={ROUTES.AUTH.VOLUNTEERPARENTALORGSCREEN}
        component={VolunteerParentalOrgScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={ROUTES.AUTH.VOLUNTEERTEACHERSCREEN}
        component={VolunteerTeacherScreen}
        options={{headerShown: false}}
      />
      <AuthStack.Screen
        name={ROUTES.AUTH.SURVEYSCREEN}
        component={SurveyScreen}
        options={{headerShown: false}}
      />

      <AuthStack.Screen
        name={ROUTES.AUTH.STUDENTENROLLMENTSCREEN}
        component={StudentEnrollmentScreen}
        options={{headerShown: false}}
      />
    </AuthStack.Navigator>
  );
}
