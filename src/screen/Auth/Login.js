import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import React, {useState} from 'react';
import {loginSvg} from '../../assets';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import CInput from '../../component/CInput';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {getData, saveData} from '../../component/CommonStorage';
import CLoader from '../../component/CLoader';
import callSaveFcm from '../../common/storeFcm';

const Login = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (email == '' || password == '') {
      return;
    }
    setLoading(true);
    await axios
      .post('http://10.0.2.2:8080/login', {
        email: email,
        password: password,
      })
      .then(async res => {
        setLoading(false);
        await saveData('userAuth', res.data);
        Toast.show({
          type: 'success',
          text2: res.data.message,
        });

        const fcmToken = await getData('FcmToken');

        callSaveFcm(res.data.user.id,fcmToken)

        if (res.data.user.requiresPasswordChange == false) {
          navigation.replace('changePassword');
        } else {
          res.data.user.role == 'admin'
            ? navigation.replace('adminhome')
            : res.data.user.role == 'employee'
            ? navigation.replace('home')
            : res.data.user.role == 'super admin'
            ? navigation.replace('superadminhome')
            : null;
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err, 'err');
        Toast.show({
          type: 'error',
          text2: err.message,
        });
      });
  };

  return (
    <SafeAreaView style={styles.conatiner}>
      <ScrollView>
        <Image source={loginSvg} style={styles.img} />
        <View style={styles.inputContainer}>
          <CInput
            label={'Email'}
            otherStyle={styles.input}
            onChangeText={txt => setEmail(txt)}
          />
          <CInput
            label={'Password'}
            otherStyle={styles.input}
            onChangeText={txt => setPassword(txt)}
          />

          <TouchableOpacity style={styles.btn} onPress={onLogin}>
            <Text style={styles.btnTxt}>Login</Text>
          </TouchableOpacity>

          <CLoader visible={loading} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

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
    height: scale(300),
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
