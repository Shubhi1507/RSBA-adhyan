import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from './AuthNavigation';
import { CoordinatorAuth, TeacherAuth } from './AppNavigation';
const RootStack = createStackNavigator();

function AppNavigation() {
  let isloggedIn = false;
  let role = 'teacher';
  //   let isloggedIn = useSelector(state => state?.authReducer?.loggedIn);
  //   let role = useSelector(state => state?.authReducer?.userData?.role);

  function AuthTypeStack() {
    if (role === 'teacher') {
      return (
        <RootStack.Screen
          name="App"
            component={TeacherAuth}
          options={{
            headerShown: false,
          }}
        />
      );
    }
    if (role === 'coordinator') {
      return (
        <RootStack.Screen
          name="App"
            component={CoordinatorAuth}
          options={{
            headerShown: false,
          }}
        />
      );
    }
  }

  return (
    <RootStack.Navigator initialRouteName={isloggedIn ? 'App' : 'Auth'}>
      {!isloggedIn ? (
        <RootStack.Screen
          name="Auth"
          component={Auth}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        AuthTypeStack()
      )}
    </RootStack.Navigator>
  );
}

export default AppNavigation;
