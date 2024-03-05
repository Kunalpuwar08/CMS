import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../utils/Colors';
import {scale} from '../../utils/Matrix';
import {useNavigation} from '@react-navigation/native';
import {saveData, getData} from '../../component/CommonStorage';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    checkData();
  }, []);

  async function checkData() {
    let res = await getData('userAuth');
    if (res == null) {
      navigation.navigate('login');
    } else if (res !== null) {
      const user = res.user;
      const role = user.role;

      role == 'admin'
        ? navigation.navigate('adminhome')
        : role == 'employee'
        ? navigation.navigate('home')
        : role == 'super admin'
        ? navigation.navigate('superadminhome')
        : null;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.txt}>CMS</Text>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    color: Colors.blue,
    fontSize: scale(30),
  },
});
