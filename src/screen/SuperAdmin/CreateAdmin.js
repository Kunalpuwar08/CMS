import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {bg} from '../../assets';
import React, {useState} from 'react';
import {API_URL} from '../../constant';
import {Fonts} from '../../utils/Fonts';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import CInput from '../../component/CInput';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CreateAdmin = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const onCreate = async () => {
    if (name == '' || email == '' || address == '' || phone == '') {
      return;
    }
    const data = {
      name,
      email,
      address,
      phone,
      plan: 'free',
    };
    await axios
      .post(`${API_URL}/signup`, data)
      .then(res => {
        Toast.show({
          type: 'success',
          text1: res.data.message,
        });
        navigation.goBack();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: err.message,
        });
        console.error(err);
      });
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.backBtnContainer}>
          <TouchableOpacity>
            <AntDesign name="left" size={scale(18)} color={Colors.white} />
          </TouchableOpacity>
          <Text style={styles.title}>Create New Admin</Text>
        </View>

        <View style={{marginVertical: scale(24)}}>
          <CInput
            otherStyle={styles.input}
            label={'name'}
            onChangeText={txt => setName(txt)}
          />
          <CInput
            otherStyle={styles.input}
            label={'email'}
            onChangeText={txt => setEmail(txt)}
          />
          <CInput
            otherStyle={styles.input}
            label={'address'}
            onChangeText={txt => setAddress(txt)}
          />
          <CInput
            otherStyle={styles.input}
            label={'phone'}
            onChangeText={txt => setPhone(txt)}
          />

          <TouchableOpacity style={styles.btn} onPress={onCreate}>
            <Text style={styles.btnTxt}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default CreateAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    padding: scale(12),
  },
  title: {
    fontSize: scale(18),
    color: Colors.white,
    marginLeft: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  backBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '100%',
  },
  btn: {
    width: '90%',
    alignSelf: 'center',
    height: scale(50),
    backgroundColor: Colors.white,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(18),
    color: Colors.black,
  },
});
