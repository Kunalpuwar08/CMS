import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {bg, changePassImg} from '../../assets';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';
import CInput from '../../component/CInput';
import axios from 'axios';
import {API_URL} from '../../constant';
import {getData} from '../../component/CommonStorage';
import Toast from 'react-native-toast-message';

const ChangePassword = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');

  useEffect(() => {
    storedData();
  }, []);

  const storedData = async () => {
    await getData('userAuth')
      .then(res => {
        setEmail(res.user.email);
      })
      .catch(err => console.log(err, 'err'));
  };

  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const onPasswordChange = () => {
    if (oldPass == '' || newPass == '') {
      return;
    }
    const data = {email: email, oldPassword: oldPass, newPassword: newPass};

    axios
      .post(`${API_URL}/change-password`, data)
      .then(res => {
        Toast.show({
          type: 'success',
          text2: res.data.message,
        });
        navigation.navigate('login');
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text2: err.message,
        });
      });
  };

  return (
    <ImageBackground style={styles.container} source={bg}>
      <Text style={styles.heading}>Change Password</Text>

      <ScrollView>
        <Image source={changePassImg} style={styles.img} />

        <CInput
          otherStyle={styles.input}
          label={'Enter old Password'}
          onChangeText={txt => setOldPass(txt)}
        />
        <CInput
          otherStyle={styles.input}
          label={'Enter new Password'}
          onChangeText={txt => setNewPass(txt)}
        />

        <TouchableOpacity style={styles.btn} onPress={onPasswordChange}>
          <Text style={styles.btnTxt}>Change</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    padding: scale(12),
  },
  img: {
    height: scale(300),
    width: '90%',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
  },
  btn: {
    width: '90%',
    alignSelf: 'center',
    height: scale(50),
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
  },
  btnTxt: {
    fontSize: scale(18),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
  },
});
