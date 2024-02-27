import React from 'react';
import {scale} from '../../utils/Matrix';
import {bg, leaveImg} from '../../assets';
import CInput from '../../component/CInput';
import {Image, ImageBackground, StyleSheet, Text, View} from 'react-native';

const EmployeeLeave = () => {
  return (
    <ImageBackground style={styles.container} source={bg}>
      <Image source={leaveImg} style={styles.img} />

      <View style={styles.inputContainer}>
        <CInput label={'Start Date'} otherStyle={styles.input} />
        <CInput label={'End Date'} otherStyle={styles.input} />
        <CInput label={'Reason'} otherStyle={styles.input} />
      </View>

    </ImageBackground>
  );
};

export default EmployeeLeave;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '90%',
    height: scale(250),
    marginTop: scale(24),
    resizeMode: 'contain',
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: scale(50),
  },
  input: {
    width: '90%',
  },
});