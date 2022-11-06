import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from './RouteConstants';
import CenterDetailsOneScreen from '../screens/auth/CenterDetailsOneScreen';
import CenterDetailsTwoScreen from '../screens/auth/CenterDetailsTwoScreen';
import VolunteerTeacherScreen from '../screens/auth/VolunteerTeacherScreen';
import SurveyScreen from '../screens/survey/SurveyScreen';
import StudentEnrollmentScreen from '../screens/auth/StudentEnrollmentScreen';

const AppStack = createStackNavigator();

export function App() {
  return (
    <AppStack.Navigator initialRouteName={ROUTES.AUTH.VOLUNTEERWELCOMESCREEN}>
      <AppStack.Screen
        name={ROUTES.AUTH.VOLUNTEERWELCOMESCREEN}
        component={CenterDetailsOneScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.VOLUNTEERPARENTALORGSCREEN}
        component={CenterDetailsTwoScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={ROUTES.AUTH.VOLUNTEERTEACHERSCREEN}
        component={VolunteerTeacherScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={ROUTES.AUTH.SURVEYSCREEN}
        component={SurveyScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.STUDENTENROLLMENTSCREEN}
        component={StudentEnrollmentScreen}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
}
