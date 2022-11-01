import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Dimensions,
  Platform,
} from 'react-native';
import {COLORS} from '../utils/colors';

const LoaderIndicator = props => {
  const {loading} = props;
  return loading === true ? (
    <View
      style={[
        styles.modalBackground,
        {
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height,
        },
      ]}>
      <ActivityIndicator animating={loading} size="large" color={COLORS.blue} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  modalBackground: {
    position: 'absolute',
    zIndex: 4,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
});

export default LoaderIndicator;
