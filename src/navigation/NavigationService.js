import {createNavigationContainerRef} from '@react-navigation/native';
import React from 'react';

export const navigationRef = createNavigationContainerRef();
export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
export function goBack() {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}
export function canGoBack() {
  if (navigationRef.canGoBack()) {
    navigationRef.canGoBack();
  }
}

export const changeStack = stackName => {
  resetRoot(stackName);
};

const resetRoot = routeName => {
  navigationRef.current?.resetRoot({
    index: 0,
    routes: [{name: routeName}],
  });
};
