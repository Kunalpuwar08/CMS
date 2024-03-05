import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {bg} from '../../assets';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import React, {useEffect, useState} from 'react';
import {getData} from '../../component/CommonStorage';
import HalfCircleChart from '../../component/HalfCircleChart';
import {useNavigation} from '@react-navigation/native';
import {Fonts} from '../../utils/Fonts';

const Home = () => {
  const navigation = useNavigation();
  const [storeData, setStoreData] = useState([]);
  const [chartData, setChartData] = useState({});

  const data = [
    {id: 1, name: 'Profile', navigate: 'employeeprofile'},
    {id: 2, name: 'Project', navigate: 'employeeprofile'},
    {id: 3, name: 'Leave', navigate: 'employeeleave'},
    {id: 4, name: 'Assets', navigate: 'employeeprofile'},
    {id: 5, name: 'Timesheet', navigate: 'employeeprofile'},
  ];

  useEffect(() => {
    checkData();
    getWorkingDays();
  }, []);

  const getWorkingDays = async () => {
    const res = await axios.get('http://10.0.2.2:8080/working-days');
    setChartData(res.data);
  };

  async function checkData() {
    let res = await getData('userAuth');
    if (res !== null) {
      const user = res.user;
      console.log(user,"user>>>>>>>>");
      setStoreData(user);
    }
  }

  const renderCards = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.card}
        key={index}
        onPress={() => navigation.navigate(item?.navigate)}>
        <View style={styles.avtar} />
        <Text style={styles.card_name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      {/* header */}
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeTxt}>
          Welcome to {storeData.companyName}
        </Text>
        <Text style={styles.nameTxt}>{storeData.name}</Text>
      </View>

      {/* box */}
      <View style={styles.box}>
        <HalfCircleChart apiData={chartData} />
        <View style={styles.txtContainer}>
          <Text style={styles.day}>Day: {chartData.todayDayCount}</Text>
          <Text style={styles.day}>
            Total days: {chartData.workingDaysCount}
          </Text>
        </View>
      </View>

      {/* Tools */}
      <View style={styles.toolsContainer}>
        <TouchableOpacity>
          <Text style={styles.seeAll}>See All Tools </Text>
        </TouchableOpacity>

        <FlatList
          data={data}
          renderItem={renderCards}
          horizontal
          contentContainerStyle={{marginTop: scale(12)}}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    height: scale(100),
    padding: scale(22),
  },
  welcomeTxt: {
    color: Colors.white,
    fontSize: scale(20),
    fontFamily: Fonts.AntaRegular,
  },
  nameTxt: {
    color: Colors.white,
    fontSize: scale(22),
    fontFamily: Fonts.AntaRegular,
  },
  box: {
    width: '90%',
    elevation: 6,
    height: scale(120),
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(12),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
  },
  txtContainer: {
    width: '40%',
  },
  day: {
    color: Colors.blue,
    fontSize: scale(16),
    lineHeight: scale(30),
    fontFamily: Fonts.AntaRegular,
  },
  toolsContainer: {
    width: '100%',
    marginLeft: '5%',
    height: scale(200),
    paddingTop: scale(12),
    marginVertical: scale(12),
  },
  seeAll: {
    fontSize: scale(16),
    color:Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
  card: {
    width: scale(120),
    height: scale(150),
    alignItems: 'center',
    marginRight: scale(12),
    borderRadius: scale(8),
    paddingVertical: scale(12),
    backgroundColor: Colors.white,
  },
  avtar: {
    width: scale(80),
    height: scale(80),
    alignSelf: 'center',
    borderRadius: scale(40),
    marginBottom: scale(12),
    backgroundColor: '#8641f4',
  },
  card_name: {
    fontSize: scale(14),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
  },
});
