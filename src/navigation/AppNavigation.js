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
import PastStudentParentsScreen from '../screens/survey/PastStudentParentsScreen';
import PresentStudentParentsScreen from '../screens/survey/PresentStudentParentsScreen';
import TeacherQuestionsScreen from '../screens/survey/TeacherQuestionsScreen';
import KendraSanchalakQuestions from '../screens/survey/KendraSanchalakQuestions';
import BastiQuestions from '../screens/survey/BastiQuestions';
import PrabuddhaJanQuestions from '../screens/survey/PrabuddhaJanQuestions';
import PastStudentQuestions from '../screens/survey/PastStudentQuestions';
import PresentStudentQuestions from '../screens/survey/PresentStudentQuestions';
import SavedSurveysScreen from '../screens/survey/SavedSurveysScreen';
import IncompleteSurveysScreen from '../screens/survey/IncompleteSurveysScreen';

const AppStack = createStackNavigator();

export function App() {
  return (
    <AppStack.Navigator initialRouteName={ROUTES.AUTH.DASHBOARDSCREEN}>
      <AppStack.Screen
        name={ROUTES.AUTH.DASHBOARDSCREEN}
        component={DashboardScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.CENTREDETAILSONESCREEN}
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
        component={PastStudentParentsScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.VARTAAMAAN_ABHIBHAVAK_SCREEN}
        component={PresentStudentParentsScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.BASTIQUESTIONS}
        component={BastiQuestions}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.SURVEYSCREEN}
        component={SurveyScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.SAVED_SURVEYS_SCREEN}
        component={SavedSurveysScreen}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.TEACHERQUESTONSSCREEN}
        component={TeacherQuestionsScreen}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name={ROUTES.AUTH.KENDRASANCHALAKSCREEN}
        component={KendraSanchalakQuestions}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.PASTSTUDENTQUESTIONS}
        component={PastStudentQuestions}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.PRABUDDHAJANQUESTIONS}
        component={PrabuddhaJanQuestions}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.PRESENTSTUDENTQUESTIONS}
        component={PresentStudentQuestions}
        options={{headerShown: false}}
      />

      <AppStack.Screen
        name={ROUTES.AUTH.INCOMPLETESURVEYSSCREEN}
        component={IncompleteSurveysScreen}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
}
