import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {bg} from '../../assets';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';
import {useNavigation} from '@react-navigation/native';

const SuperAdminHome = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={{padding: scale(12)}}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Super Admin</Text>
      </View>

      <View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('createadmin')}>
          <Text style={styles.btnTxt}>create admin</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnTxt}>analyze admin</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default SuperAdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
  subtitle: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
  btn: {
    width: '90%',
    height: scale(50),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: scale(12),
    justifyContent: 'center',
    marginVertical: scale(12),
    backgroundColor: Colors.white,
  },
  btnTxt: {
    fontSize: scale(18),
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
  },
});
