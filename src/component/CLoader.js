import {ActivityIndicator, Modal, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../utils/Colors';
import {scale} from '../utils/Matrix';
import {Fonts} from '../utils/Fonts';

const CLoader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <View style={styles.loadingBox}>
          <ActivityIndicator color={Colors.blue} size={'large'} />
          <Text style={styles.loadingTxt}>Loading......</Text>
        </View>
      </View>
    </Modal>
  );
};

export default CLoader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingBox: {
    width: '90%',
    elevation: 6,
    padding: scale(8),
    height: scale(60),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(12),
    backgroundColor: Colors.white,
  },
  loadingTxt: {
    fontSize: scale(18),
    color: Colors.black,
    marginLeft: scale(22),
    fontFamily: Fonts.AntaRegular,
  },
});
