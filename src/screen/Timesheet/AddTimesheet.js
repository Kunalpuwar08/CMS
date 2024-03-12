import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {bg, timesheetImg} from '../../assets';
import {Colors} from '../../utils/Colors';
import {scale} from '../../utils/Matrix';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Fonts} from '../../utils/Fonts';
import CInput from '../../component/CInput';
import CDatePicker from '../../component/CDatePicker';
import {useNavigation} from '@react-navigation/native';
import {UserAuthContext} from '../../context/authContext';
import axios from 'axios';
import {API_URL} from '../../constant';
import CLoader from '../../component/CLoader';
import Toast from 'react-native-toast-message';

const AddTimesheet = () => {
  const navigation = useNavigation();
  const {token, userData} = useContext(UserAuthContext);

  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [projectName, setProjectName] = useState('');
  const [workingHours, setWorkingHours] = useState(0);
  const [description, setDescription] = useState('');

  const onSave = async () => {
    if (projectName == '' || workingHours == 0 || description == '') {
      Alert.alert('Warning', 'Please fill all required field');
      return;
    }
    setLoading(true);
    const data = {
      email: userData?.email,
      date: selectedDate,
      hoursWorked: workingHours,
      description: description,
      projectName: projectName,
      companyId: userData?.companyId,
      name:userData?.name
    };

    await axios
      .post(`${API_URL}/timesheets`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then(() => {
        Toast.show({
          type: 'success',
          text2: 'timesheets created successfully',
        });
        navigation.goBack();
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={scale(18)} color={Colors.white} />
          <Text style={styles.backTxt}>Add Timesheet</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.mainWrapper}>
        <Image source={timesheetImg} style={styles.mainImg} />

        <CDatePicker
          placeholder={'Select Date'}
          otherStyle={{width: '80%'}}
          onDateSelect={txt => setSelectedDate(txt)}
        />
        <CInput
          otherStyle={styles.input}
          label={'Project Name'}
          onChangeText={txt => setProjectName(txt)}
        />
        <CInput
          otherStyle={styles.input}
          label={'working hours'}
          onChangeText={txt => setWorkingHours(txt)}
        />
        <CInput
          otherStyle={styles.input}
          label={'Description'}
          multiline={true}
          numberOfLines={4}
          onChangeText={txt => setDescription(txt)}
        />
        <TouchableOpacity style={styles.saveBtn} onPress={onSave}>
          <Text style={styles.saveBtnTxt}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
      <CLoader visible={loading} />
    </ImageBackground>
  );
};

export default AddTimesheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backTxt: {
    fontSize: scale(16),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    marginLeft: scale(12),
  },
  mainWrapper: {
    width: '90%',
    alignSelf: 'center',
  },
  mainImg: {
    height: scale(250),
    width: '100%',
    resizeMode: 'contain',
  },
  input: {
    width: '90%',
  },
  saveBtn: {
    width: '80%',
    alignSelf: 'center',
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple,
    borderRadius: scale(6),
  },
  saveBtnTxt: {
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(18),
  },
});
