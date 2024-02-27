import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../utils/Colors';
import axios from 'axios';
import {getData} from '../../component/CommonStorage';
import {API_URL} from '../../constant';
import {bg, profileImg} from '../../assets';
import {scale} from '../../utils/Matrix';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import { Fonts } from '../../utils/Fonts';

const Employee = () => {
  const navigation = useNavigation();
  const [listOfEmployee, setListOfEmployee] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const data = await getData('userAuth');
      const token = data?.token;
      const apiData = await axios.get(`${API_URL}/employees`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setListOfEmployee(apiData.data.employees);
    };
    callApi();
  }, [listOfEmployee]);


  const renderCard = ({item, index}) => {
    const data = item;
    return (
      <View style={styles.card} key={index}>
        <View>
          <Image source={profileImg} style={styles.img} />
        </View>
        <View style={{width:'55%'}}>
          <Text style={styles.id} numberOfLines={1}>Id: {data?.id}</Text>
          <Text style={styles.name}>{data?.name}</Text>
          <Text style={styles.designation}>{data?.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>List Of Employee</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={listOfEmployee}
          renderItem={renderCard}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom:scale(80)}}
        />
      </View>

      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => navigation.navigate('createemployee')}>
        <AntDesign name="plus" size={scale(18)} color={Colors.white} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Employee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    height: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(12),
    width:'90%',
    alignSelf:'center'
  },
  heading: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily:Fonts.AntaRegular,
  },
  listContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    height: scale(150),
    backgroundColor: Colors.white,
    marginVertical: scale(12),
    borderRadius: scale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: scale(20),
    width:'100%'
  },
  name: {
    fontSize: scale(14),
    color: Colors.black,
    fontFamily:Fonts.AntaRegular,
    textTransform: 'uppercase',
  },
  designation: {
    fontSize: scale(12),
    color: Colors.black,
    fontFamily:Fonts.AntaRegular,
  },
  img: {
    height: scale(100),
    width: scale(100),
    borderRadius: scale(50),
    resizeMode: 'contain',
  },
  floatBtn: {
    position: 'absolute',
    bottom: scale(10),
    right: scale(10),
    height: scale(60),
    width: scale(60),
    borderRadius: scale(30),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
  id:{
    width:'55%',
    color:Colors.black,
    fontFamily:Fonts.AntaRegular
  }
});
