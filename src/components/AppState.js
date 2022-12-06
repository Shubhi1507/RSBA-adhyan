import React, {Component} from 'react';
import {StyleSheet, View, Platform, AppState, Text} from 'react-native';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      appState: AppState.currentState,
    };
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    return nextAppState;
    // this.setState({appState: nextAppState});

    // if (nextAppState === 'background') {
    //   // Do something here on app background.
    //   console.log('App is in Background Mode.');
    // }

    // if (nextAppState === 'active') {
    //   // Do something here on app active foreground mode.
    //   console.log('App is in Active Foreground Mode.');
    // }

    // if (nextAppState === 'inactive') {
    //   // Do something here on app inactive mode.
    //   console.log('App is in inactive Mode.');
    // }
  };
}
