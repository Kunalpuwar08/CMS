import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Fonts} from '../../utils/Fonts';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import {bg, profileImg} from '../../assets';
import CInput from '../../component/CInput';
import React, {useEffect, useState} from 'react';
import {getData} from '../../component/CommonStorage';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';

const Employee_profile = () => {
  useEffect(() => {
    checkData();
  }, []);
  const [storeData, setStoreData] = useState({});

  async function checkData() {
    let res = await getData('userAuth');
    if (res !== null) {
      const user = res.user;
      setStoreData(user);
      setId(user?.id);
      setName(user.name);
      setEmail(user?.email);
      user?.phone && setPhone(user?.phone);
      user?.panNo && setPhone(user?.panNo);
      user?.address && setPhone(user?.address);
      user?.companyName && setcompanyName(user?.companyName);
    }
  }

  const navigation = useNavigation();

  const [isEditable, setIsEditable] = useState(false);
  const [id, setId] = useState();
  const [email, setEmail] = useState('');
  const [companyName, setcompanyName] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [panNo, setPanNo] = useState('');
  const [address, setAddress] = useState('');

  const onEdit = async () => {
    await axios
      .put(`http://10.0.2.2:8080/employees/${id}`, {
        name: name,
        email: email,
        companyName: companyName,
        phone: phone,
        address: address,
        panNo: panNo,
      })
      .then(res => console.log(res.data));
  };

  const setEdit = () => {
    if (isEditable) {
      onEdit();
      setIsEditable(false);
    } else setIsEditable(!isEditable);
  };

  return (
    <ImageBackground style={styles.container} source={bg}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={scale(20)} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.heading}>Profile</Text>
        <TouchableOpacity onPress={setEdit}>
          <AntDesign
            name={isEditable ? 'check' : 'edit'}
            size={scale(20)}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.inputContainer}>
        <TouchableOpacity>
          <Image source={profileImg} style={styles.img} />
        </TouchableOpacity>

        <CInput
          label={'Name'}
          value={name}
          otherStyle={styles.input}
          disabled={!isEditable}
          onChangeText={txt => setName(txt)}
        />
        <CInput
          label={'Email'}
          value={storeData.email}
          otherStyle={styles.input}
          disabled={true}
        />
        <CInput
          label={'Phone'}
          value={phone}
          otherStyle={styles.input}
          disabled={!isEditable}
          onChangeText={txt => setPhone(txt)}
        />
        <CInput
          label={'Pan Number'}
          value={panNo}
          otherStyle={styles.input}
          disabled={!isEditable}
          onChangeText={txt => setPanNo(txt)}
        />
        <CInput
          label={'Address'}
          value={address}
          otherStyle={styles.input}
          disabled={!isEditable}
          onChangeText={txt => setAddress(txt)}
        />
      </ScrollView>
    </ImageBackground>
  );
};

export default Employee_profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: scale(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(12),
    alignItems: 'center',
  },
  heading: {
    color: Colors.white,
    textAlign: 'center',
    fontSize: scale(20),
    fontFamily: Fonts.AntaRegular,
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  img: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(50),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginVertical: scale(12),
  },
  input: {
    width: '90%',
  },
});
