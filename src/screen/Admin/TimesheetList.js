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
import {useNavigation} from '@react-navigation/native';
import {UserAuthContext} from '../../context/authContext';
import {API_URL} from '../../constant';
import axios from 'axios';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Fonts } from '../../utils/Fonts';
import CInput from '../../component/CInput';

const TimesheetList = () => {
  const navigation = useNavigation();
  const {token, userData} = useContext(UserAuthContext);

  const [listData, setListData] = useState([]);

  useEffect(() => {
    getAPIData();
  }, []);

  const getAPIData = async () => {
    const apiData = await axios.get(
      `${API_URL}/alltimesheet/${userData?.email}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      },
    );
    setListData(apiData.data);
  };

  const renderList = ({item,index}) => {
    return(
        <TouchableOpacity style={styles.card} key={index}>
            
        </TouchableOpacity>
    )
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backBtn}>
          <AntDesign name="left" size={scale(18)} color={Colors.white} />
          <Text style={styles.backTxt}>List Timesheet</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <AntDesign name="filter" size={scale(18)} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <View>
        <CInput label={'Search......'} otherStyle={styles.searchInput} />
        <FlatList data={listData} renderItem={renderList} keyExtractor={i => i.id} />
      </View>
    </ImageBackground>
  );
};

export default TimesheetList;

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
  searchInput:{
    width:'90%',
    height:scale(40)
  },
  card:{
    width:'90%',
    height:scale(150),
    backgroundColor:Colors.white,
  }
});
