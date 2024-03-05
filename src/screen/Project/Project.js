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
  const [listData, setListData] = useState([]);

  useEffect(() => {
    getProjects();
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
    navigation.navigate('projectdescription', {item: item});
  };

  const renderCard = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        key={index}
        onPress={() => onCardPress(item)}>
        <View>
          <Text style={styles.cardDate} numberOfLines={1}>
            {item.id}
          </Text>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDesc}>{item.description}</Text>
          <Text style={styles.cardDate}>
            {item.createdDate} - {item.deadlineDate}
          </Text>
          <Text style={styles.cardPriority}>Priority - {item.priority}</Text>
          <Text style={styles.cardDate}>
            Attachment - {item?.files?.length}
          </Text>
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

      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => navigation.navigate('addproject')}>
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
    padding: scale(8),
    height: scale(120),
    alignSelf: 'center',
    flexDirection: 'row',
    borderRadius: scale(8),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
    marginVertical:scale(8)
  },
  cardTitle: {
    color: Colors.black,
    fontSize: scale(16),
    fontFamily: Fonts.AntaRegular,
  },
  cardDesc: {
    color: Colors.blue,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  cardDate: {
    color: Colors.black,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  cardPriority: {
    color: Colors.blue,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  floatBtn: {
    width: scale(50),
    right: scale(10),
    bottom: scale(10),
    height: scale(50),
    alignItems: 'center',
    position: 'absolute',
    borderRadius: scale(25),
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
});
