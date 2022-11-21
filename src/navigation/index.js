import React from 'react';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from './AuthNavigation';
import {App, CoordinatorAuth, TeacherAuth} from './AppNavigation';
const RootStack = createStackNavigator();

function AppNavigation() {
  let isloggedIn = useSelector(state => state?.authReducer?.loggedIn);;
  // let isloggedIn = true ;
  let role = 'teacher';
  let x = useSelector(state => state?.authReducer?.loggedIn);
  //   let role = useSelector(state => state?.authReducer?.userData?.role);

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
        <RootStack.Screen
          name="App"
          component={App}
          options={{
            headerShown: false,
          }}
        />
      )}
    </RootStack.Navigator>
  );
}

export default AppNavigation;
