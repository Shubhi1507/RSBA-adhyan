import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ROUTES} from './RouteConstants';
import CenterDetailsOneScreen from '../screens/auth/CenterDetailsOneScreen';
import CenterDetailsTwoScreen from '../screens/auth/CenterDetailsTwoScreen';
import SelectAudienceScreen from '../screens/auth/SelectAudienceScreen';
import SurveyScreen from '../screens/survey/SurveyScreen';
import StudentEnrollmentScreen from '../screens/auth/StudentEnrollmentScreen';
import DashboardScreen from '../screens/home/DashboardScreen';
import CentreQuestionsScreen from '../screens/survey/CentreQuestionsScreen';
import PurvAbhibhavakScreen from '../screens/survey/PurvAbhibhavakScreen';
import VartaMaanAbhibhavakScreen from '../screens/survey/VartaMaanAbhibhavakScreen';

const AppStack = createStackNavigator();

export function App() {
  return (
    <AppStack.Navigator initialRouteName={ROUTES.AUTH.SELECTAUDIENCESCREEN}>
      <AppStack.Screen
        name={ROUTES.AUTH.DASHBOARDSCREEN}
        component={DashboardScreen}
        options={{headerShown: false}}
      />

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
        name={ROUTES.AUTH.SELECTAUDIENCESCREEN}
        component={SelectAudienceScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={ROUTES.AUTH.CENTREQUESTIONSCREEN}
        component={CentreQuestionsScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={ROUTES.AUTH.PURV_ABHIBHAVAK_SCREEN}
        component={PurvAbhibhavakScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.VARTAAMAAN_ABHIBHAVAK_SCREEN}
        component={VartaMaanAbhibhavakScreen}
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
