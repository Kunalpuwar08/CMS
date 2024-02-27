import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../utils/Colors';
import {loginSvg} from '../../assets';
import CInput from '../../component/CInput';
import {scale} from '../../utils/Matrix';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignup = async () => {
    await axios
      .post('http://10.0.2.2:8080/signup', {
        name: name,
        email: email,
        phone: phone,
        address: address,
        password: password,
        plan: 'free',
      })
      .then(res => {
        Toast.show({
          type: 'success',
          text1: res.data.message,
        })
      })
      .catch(err =>
        Toast.show({
          type: 'error',
          text1: err.message,
        }),
      );
  };
  const onLogin = () => {
    navigation.navigate('login');
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <ScrollView>
        <Image source={loginSvg} style={styles.img} />
        <View style={styles.inputContainer}>
          <CInput
            label={'Shop name'}
            otherStyle={styles.input}
            onChangeText={txt => setName(txt)}
          />
          <CInput
            label={'Email'}
            otherStyle={styles.input}
            onChangeText={txt => setEmail(txt)}
          />
          <CInput
            label={'Phone'}
            otherStyle={styles.input}
            onChangeText={txt => setPhone(txt)}
          />
          <CInput
            label={'Address'}
            otherStyle={styles.input}
            onChangeText={txt => setAddress(txt)}
          />
          <CInput
            label={'Password'}
            otherStyle={styles.input}
            onChangeText={txt => setPassword(txt)}
          />

          <TouchableOpacity style={styles.btn} onPress={onSignup}>
            <Text style={styles.btnTxt}>Signup</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.borderbtn} onPress={onLogin}>
            <Text style={styles.borderbtnTxt}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  inputContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
  },
  img: {
    width: '100%',
    height: scale(200),
    resizeMode: 'contain',
  },
  btn: {
    width: '80%',
    height: scale(40),
    alignItems: 'center',
    borderRadius: scale(4),
    justifyContent: 'center',
    marginVertical: scale(8),
    backgroundColor: '#64a5ff',
  },
  borderbtn: {
    width: '80%',
    borderWidth: 1,
    height: scale(40),
    alignItems: 'center',
    borderColor: '#64a5ff',
    borderRadius: scale(4),
    justifyContent: 'center',
    marginVertical: scale(8),
  },
  btnTxt: {
    color: Colors.white,
    fontSize: scale(18),
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  borderbtnTxt: {
    color: Colors.blue,
    fontSize: scale(18),
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});
