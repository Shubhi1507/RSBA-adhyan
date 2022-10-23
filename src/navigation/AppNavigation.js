import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TecherSurveyScreen from '../screens/teacher/TeacherSurveyScreen';
import CoordinatorSurveryScreen from '../screens/coordinator/CoordinatorSurveryScreen';

const TeacherStack = createStackNavigator();
const CoordinatorStack = createStackNavigator();

function TeacherAuth() {
  return (
    <TeacherStack.Navigator>
      <TeacherStack.Screen component={TecherSurveyScreen} />
    </TeacherStack.Navigator>
  );
}

function CoordinatorAuth() {
  return (
    <CoordinatorStack.Navigator>
      <CoordinatorStack.Screen component={CoordinatorSurveryScreen} />
    </CoordinatorStack.Navigator>
  );
}

export {TeacherAuth, CoordinatorAuth};
