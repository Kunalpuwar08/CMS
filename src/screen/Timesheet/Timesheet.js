import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {bg} from '../../assets';
import {scale} from '../../utils/Matrix';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import { API_URL } from '../../constant';
import { UserAuthContext } from '../../context/authContext';
import axios from 'axios';

const Timesheet = () => {
  const navigation = useNavigation();
  const {token, userData} = useContext(UserAuthContext);

  const [listData, setListData] = useState([]);

  useEffect(() => {
    getAPIData();
  }, []);

  const getAPIData = async() => {
    const apiData = await axios.get(`${API_URL}/timesheets`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setListData(apiData.data);
  };

  const renderCards = ({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <Text style={styles.dateTxt}>{moment(item.date).format('LL')}</Text>
        <Text style={styles.projectNameTxt}>{item.projectName}</Text>
        <Text style={styles.totalHoursTxt}>Total hours: {item.hoursWorked}</Text>
        <Text style={styles.descTxt} numberOfLines={3}>{item.description}</Text>
      </View>
    );
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn}>
          <AntDesign name="left" size={scale(18)} color={Colors.white} />
          <Text style={styles.backTxt}>Timesheet</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesign name="filter" size={scale(18)} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.listWrapper}>
        <FlatList
          data={listData}
          renderItem={renderCards}
          keyExtractor={i => i.id}
        />
      </View>

      <TouchableOpacity
        style={styles.flotBtn}
        onPress={() => navigation.navigate('addTimesheet')}>
        <AntDesign name="plus" size={scale(20)} color={Colors.white} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Timesheet;

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
  listWrapper: {
    width: '90%',
    alignSelf: 'center',
    marginTop: scale(18),
  },
  card: {
    width: '100%',
    height: scale(150),
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    marginVertical: scale(8),
    padding: scale(12),
  },
  dateTxt: {
    fontSize: scale(14),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
    textDecorationLine: 'underline',
  },
  projectNameTxt: {
    fontSize: scale(12),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
    marginVertical: scale(8),
  },
  totalHoursTxt:{
    fontSize: scale(12),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
    marginVertical: scale(6),
  },
  descTxt:{
    fontSize: scale(12),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
    marginTop: scale(6),
  },
  flotBtn: {
    height: scale(50),
    width: scale(50),
    borderRadius: scale(25),
    backgroundColor: Colors.purple,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: scale(20),
    right: scale(20),
  },
});
