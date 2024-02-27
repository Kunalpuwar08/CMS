import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {bg} from '../../assets';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import CInput from '../../component/CInput';
import CDropdown from '../../component/CDropdown';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getData} from '../../component/CommonStorage';
import axios from 'axios';
import {API_URL} from '../../constant';
import Toast from 'react-native-toast-message';

const CreateAsset = () => {
  const navigation = useNavigation();
  const [imgObj, setImgObj] = useState(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [type, setType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');

  const goBack = () => {
    navigation.goBack();
  };

  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        quality: 0.6,
        cameraType: 'back',
        saveToPhotos: true,
      },
      res => {
        setImgObj(res.assets[0]);
      },
    );
  };



  const onCreateAsset = async () => {
    const formData = new FormData();
    formData.append('image', imgObj);
    formData.append('name', name);
    formData.append('status', status);
    formData.append('type', type);
    formData.append('serialNumber', serialNumber);
    formData.append('brand', brand);
    formData.append('description', description);

    const storedData = await getData('userAuth');
    const token = storedData?.token;

    await axios
      .post(`${API_URL}/assets`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token,
        },
      })
      .then((res) => {
        Toast.show({
          type: 'success',
          text2: 'Assets created successfully',
        });
        // goBack()
        console.log(res.data,"res");
      })
      .catch(err => console.log(err));
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.leftBtn} onPress={goBack}>
          <AntDesign name="left" color={Colors.white} size={scale(18)} />
        </TouchableOpacity>
        <Text style={styles.heading}>Create Assets</Text>
      </View>

      <ScrollView style={styles.wrapper}>
        <TouchableOpacity style={styles.profileImg} onPress={openCamera}>
          {imgObj == null ? (
            <FontAwesome name="file-image-o" size={scale(26)} />
          ) : (
            <Image source={{uri: imgObj.uri}} style={styles.profileImg} />
          )}
        </TouchableOpacity>
        <CInput
          label={'Name'}
          otherStyle={styles.input}
          onChangeText={txt => setName(txt)}
        />
        <CInput
          label={'Brand'}
          otherStyle={styles.input}
          onChangeText={txt => setBrand(txt)}
        />
        <CInput
          label={'Status'}
          otherStyle={styles.input}
          onChangeText={txt => setStatus(txt)}
        />
        <CInput
          label={'Type'}
          otherStyle={styles.input}
          onChangeText={txt => setType(txt)}
        />
        <CInput
          label={'SerialNumber'}
          otherStyle={styles.input}
          onChangeText={txt => setSerialNumber(txt)}
        />
        <CInput
          label={'Description'}
          otherStyle={styles.input}
          onChangeText={txt => setDescription(txt)}
        />

        <TouchableOpacity style={styles.btn} onPress={onCreateAsset}>
          <Text style={styles.btnTxt}>Add Asset</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

export default CreateAsset;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
  },
  heading: {
    fontSize: scale(18),
    color: Colors.white,
    fontWeight: 'bold',
  },
  leftBtn: {
    marginHorizontal: scale(12),
  },
  wrapper: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
  },
  input: {
    width: '90%',
  },
  profileImg: {
    height: scale(80),
    width: scale(80),
    borderRadius: scale(40),
    backgroundColor: Colors.blue,
    alignSelf: 'center',
    marginVertical: scale(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '80%',
    height: scale(40),
    alignItems: 'center',
    borderRadius: scale(4),
    justifyContent: 'center',
    marginVertical: scale(8),
    backgroundColor: '#027BFE',
    alignSelf: 'center',
  },
  btnTxt: {
    fontWeight: 'bold',
    fontSize: scale(16),
    color: Colors.white,
    textTransform: 'uppercase',
  },
});
