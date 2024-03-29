import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, HelperText, Avatar} from 'react-native-paper';
import {Fonts} from '../utils/Fonts';
import { Colors } from '../utils/Colors';

const CInput = ({
  label,
  value,
  error,
  iconImg,
  disabled,
  multiline,
  errorText,
  showImage,
  otherStyle,
  onChangeText,
  numberOfLines,
  secureTextEntry,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        label={label}
        value={value}
        onChangeText={onChangeText}
        error={error}
        {...props}
        style={[styles.input, otherStyle]}
        secureTextEntry={secureTextEntry ? secureTextEntry : false}
        underlineStyle={{display: 'none'}}
        disabled={disabled}
        numberOfLines={numberOfLines}
        multiline={multiline}
        textColor={Colors.black}
      />
      {showImage && (
        <Avatar.Image
          size={24}
          source={iconImg}
          style={{
            backgroundColor: 'transparent',
            position: 'absolute',
            right: 12,
            bottom: 12,
          }}
        />
      )}
      <HelperText type="error" visible={error}>
        {errorText}
      </HelperText>
    </View>
  );
};

export default CInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    fontFamily: Fonts.AntaRegular,
  },
});
