import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {screenWidth} from '../libs';
import {KeyLiteralMapper} from '../libs/ErrorHandler';
import {COLORS} from '../utils/colors';

const InputTheme = {
  colors: {
    primary: COLORS.black,
    placeholder: COLORS.black,
    text: COLORS.black,
  },
};

const CustomWhite = {
  colors: {
    primary: COLORS.white,
    // background: COLORS.transparent,
    placeholder: COLORS.black,
    text: COLORS.white,
  },
};

const DialogInputTheme = {
  colors: {
    primary: COLORS.backgroundColor,
    // background: COLORS.transparent,
    placeholder: COLORS.black,
    text: COLORS.black,
  },
};

export const Input = ({
  placeholder,
  containerStyle,
  onChangeText,
  value,
  name,
  type,
  secure,
  message,
  number,
  disabled,
  multi,
  empty,
}) => {
  const [isShow, setisShow] = useState(secure);
  let containerCustomStyle = containerStyle ?? {};
  return (
    <>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isShow}
        textContentType={'none'}
        keyboardType={type ? type : 'default'}
        maxLength={number}
        disabled={disabled}
        multiline={multi ? true : false}
        autoCorrect={false}
        autoCapitalize={'none'}
        style={[
          styles.textInputStyle,
          containerCustomStyle,
          empty ? {borderColor: COLORS.red, borderWidth: 1} : {},
        ]}
        placeholderTextColor={COLORS.lightGrey}
        // right={
        //   secure && (
        //     <TextInput.Icon
        //       name={() => (
        //         <Icon
        //           name={isShow ? 'eye-slash' : 'eye'}
        //           size={18}
        //           color={COLORS.black}
        //         />
        //       )}
        //       onPress={() => {
        //         setisShow(!isShow);
        //       }}
        //     />
        //   )
        // }
      />

      {message != '' && name == message ? (
        message == 'email' ? (
          <Text style={styles.errorMessage}>please enter the valid email.</Text>
        ) : (
          <Text style={styles.errorMessage}>
            {KeyLiteralMapper(message)} field is required.
          </Text>
        )
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  textInputStyle: {
    padding: 10,
    minHeight: 50,
    marginVertical: 10,
    borderColor: COLORS.orange,
    borderWidth: 1,
    height: 50,
    flex: 1,
    flexGrow: 1,
    minWidth: screenWidth * 0.8,
    borderRadius: 5,
    color: 'black',
    lineHeight: 18,
  },
  errorMessage: {
    color: COLORS.red,
  },
});
