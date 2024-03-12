import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';
import {UserAuthContext} from '../../context/authContext';
import axios from 'axios';
import {API_URL} from '../../constant';
import {scale} from '../../utils/Matrix';
import {bg} from '../../assets';
import moment from 'moment';
import Toast from 'react-native-toast-message';

const LeaveManagment = () => {
  const {token, userData} = useContext(UserAuthContext);
  const [apiData, setApiData] = useState([]);
  const [activeState, setActiveState] = useState(0);
  const [pendingData, setPendingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);

  const getListRequest = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_URL}/leaverequests/${userData?.email}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      );
      setApiData(res.data);
      let pendingdata = res.data.filter((i, e) => i.status === 'pending');
      setPendingData(pendingdata);
      let completeddata = res.data.filter((i, e) => i.status !== 'pending');
      setCompletedData(completeddata);
    } catch (error) {
      console.log(error, 'Error in fetching Data');
    }
  }, [token, userData,pendingData,completedData]);

  useEffect(() => {
    getListRequest();
  }, [getListRequest]);

  const renderCard = useCallback(({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <View>
          <Text style={styles.reuse}>ID: {item.employeeId}</Text>
          <Text style={styles.reuse}>Name: {item.employeeName}</Text>
          <Text style={styles.reuse}>
            Duration: {moment(item.startDate).format('ll')} -{' '}
            {moment(item.endDate).format('ll')}
          </Text>
          <Text style={styles.reuse}>Type: {item.leaveType}</Text>
          <Text style={styles.reuse}>Reason: {item.reason}</Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn(Colors.red)}
            onPress={() => updateLeave(item, 'reject')}>
            <Text style={styles.btnTxt}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn(Colors.blue)}
            onPress={() => updateLeave(item, 'approve')}>
            <Text style={styles.btnTxt}>Approve</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [pendingData]);

  const renderCompletedCard = useCallback(({item, index}) => {
    return (
      <View style={styles.card} key={index}>
        <Text style={styles.reuse}>ID: {item.employeeId}</Text>
        <Text style={styles.reuse}>Name: {item.employeeName}</Text>
        <Text style={styles.reuse}>
          Duration: {moment(item.startDate).format('ll')} -{' '}
          {moment(item.endDate).format('ll')}
        </Text>
        <Text style={styles.reuse}>Type: {item.leaveType}</Text>
        <Text style={styles.reuse}>Reason: {item.reason}</Text>
      </View>
    );
  },[completedData]);

  const updateLeave = async (item, action) => {
    await axios
      .put(
        `${API_URL}/processleave/${item?.id}`,
        {action},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        },
      )
      .then(res => {
        Toast.show({
            type:'success',
            text2:res.data.message
        })
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <ImageBackground source={bg} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <AntDesign name="left" size={scale(18)} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTxt}>Leave Management</Text>
      </View>

      <View style={styles.toggleBtnContainer}>
        <TouchableOpacity
          style={styles.toggleBtn(activeState == 0 ? 1 : 0)}
          onPress={() => setActiveState(0)}>
          <Text style={styles.toggleBtnTxt}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.toggleBtn(activeState == 1 ? 1 : 0)}
          onPress={() => setActiveState(1)}>
          <Text style={styles.toggleBtnTxt}>Completed</Text>
        </TouchableOpacity>
      </View>

      <View>
        {activeState === 0 ? (
          <FlatList
            data={pendingData}
            renderItem={renderCard}
            keyExtractor={(item, index) => item.id.toString()}
          />
        ) : (
          <FlatList
            data={completedData}
            renderItem={renderCompletedCard}
            keyExtractor={(item, index) => item.id.toString()}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default LeaveManagment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: scale(50),
    padding: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTxt: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    marginLeft: scale(12),
  },
  card: {
    height: scale(150),
    width: '90%',
    alignSelf: 'center',
    marginVertical: scale(12),
    backgroundColor: Colors.white,
    borderRadius: scale(12),
    padding: scale(12),
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: color => ({
    height: 40,
    width: '45%',
    backgroundColor: color,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(5),
    borderRadius: scale(6),
  }),
  btnTxt: {
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(14),
  },
  reuse: {
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(12),
  },
  toggleBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleBtn: border => ({
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: scale(50),
    borderBottomWidth: border,
    borderColor: Colors.white,
  }),
  toggleBtnTxt: {
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(16),
    color: Colors.white,
  },
});
