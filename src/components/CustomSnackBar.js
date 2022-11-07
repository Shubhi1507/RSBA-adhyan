import * as React from 'react';
import {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {screenWidth} from '../libs';
import {COLORS} from '../utils/colors';
import {TextHandler} from './TextHandler';

export const CustomSnackBar = ({
  visible,
  onToggleSnackBar,
  onDismissSnackBar,
  message,
}) => {
  useEffect(() => {}, [visible]);
  return (
    visible && (
      <View style={styles.container}>
        <Snackbar
          visible={visible}
          style={{
            backgroundColor: COLORS.error,
            height: 60,
          }}
          action={{
            label: 'X',
            labelStyle: {
              color: COLORS.white,
              fontWeight: '400',
            },
            onPress: () => {
              onDismissSnackBar();
            },
          }}
          onDismiss={() => onDismissSnackBar()}>
          <TextHandler
            style={{
              color: COLORS.white,
              textAlign: 'center',
              fontWeight: '400',
            }}>
            {message}
          </TextHandler>
        </Snackbar>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    width: screenWidth,
    height: 200,
    zIndex: 10,
  },
});
