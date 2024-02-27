import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {API_URL} from '../../constant';
import {bg} from '../../assets';
import {scale} from '../../utils/Matrix';
import {Fonts} from '../../utils/Fonts';
import {Colors} from '../../utils/Colors';
import {getData} from '../../component/CommonStorage';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Project = () => {
  const navigation = useNavigation();
  const [listData, setListData] = useState([
    {
      admin: 'mahesh soni',
      companyId: 'admin@gryffincode.com',
      contributor: '5',
      createdDate: '01-11-22',
      deadlineDate: '01-11-23',
      description:
        "this project is based on insurance system and it's build on react native",
      files: [],
      id: '54f74390-d9a0-4668-b31b-1b3fc8ce8bab',
      name: 'absli',
      priority: 'high',
      status: 'process',
      task: [],
      assignTo: 'mahesh',
    },
  ]);
  useEffect(() => {
    // getProjects();
  }, []);

  const getProjects = async () => {
    const storedData = await getData('userAuth');
    const token = storedData?.token;

    await axios
      .get(`${API_URL}/getprojects`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      .then(res => {
        setListData(res.data.employees);
      })
      .catch(err => console.log(err));
  };

  const onCardPress = item => {
    console.log(item, 'navigation');
    navigation.navigate('projectdescription', {item: item});
  };

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        key={index}
        onPress={() => onCardPress(item)}>
        <View style={{width: '20%'}}></View>
        <View style={{width: '80%'}}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDesc}>{item.description}</Text>
          <Text style={styles.cardDate}>
            {item.createdDate} - {item.deadlineDate}
          </Text>
          <Text style={styles.cardPriority}>Priority - {item.priority}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>List Of Projects</Text>
      </View>

      <View>
        <FlatList
          data={listData}
          renderItem={renderCard}
          keyExtractor={i => i.id}
        />
      </View>

      <TouchableOpacity style={styles.floatBtn} onPress={() => navigation.navigate('addproject')}>
        <AntDesign name="plus" size={scale(22)} color={Colors.white} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Project;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: scale(18),
  },
  title: {
    color: Colors.white,
    fontSize: scale(20),
    fontFamily: Fonts.AntaRegular,
  },
  card: {
    width: '90%',
    alignSelf: 'center',
    height: scale(120),
    borderRadius: scale(8),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    // alignItems:'center',
    justifyContent: 'space-between',
    padding: scale(8),
  },
  cardTitle: {
    fontSize: scale(16),
    fontFamily: Fonts.AntaRegular,
    color: Colors.black,
  },
  cardDesc: {
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
    color: Colors.blue,
  },
  cardDate: {
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
    color: Colors.black,
  },
  cardPriority: {
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
    color: Colors.blue,
  },
  floatBtn:{
    height:scale(50),
    width:scale(50),
    borderRadius:scale(25),
    backgroundColor:Colors.blue,
    alignItems:'center',
    justifyContent:'center',
    position:'absolute',
    bottom:scale(10),
    right:scale(10)
  }
});
