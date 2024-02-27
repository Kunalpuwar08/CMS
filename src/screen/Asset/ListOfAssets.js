import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {bg, emptyImg} from '../../assets';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import {getData} from '../../component/CommonStorage';
import axios from 'axios';
import {API_URL} from '../../constant';
import QRCode from 'react-native-qrcode-svg';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ListOfAssets = () => {
  const navigation = useNavigation();
  const [listOfAsset, setListOfAsset] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const data = await getData('userAuth');
      const token = data?.token;
      const apiData = await axios.get(`${API_URL}/assets`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      setListOfAsset(apiData.data);
    };
    callApi();
  }, []);

  const emptyComp = () => {
    return (
      <View>
        <Image source={emptyImg} style={styles.emptyImgStyle} />
        <Text style={styles.emptyTxt}>You don't have any assets</Text>
      </View>
    );
  };

  const renderCard = useCallback(({item, index}) => {
    const data = item?.data;
    return (
      <View style={styles.card} key={index}>
        <View>
          <QRCode value={JSON.stringify(data)} />
        </View>
        <View>
          <Text style={styles.name}>Name: {data.name}</Text>
          <Text style={styles.type}>Type: {data.type}</Text>
          <Text style={styles.status}>Status: {data.status}</Text>
        </View>
      </View>
    );
  }, []);

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>List Of Assets</Text>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={listOfAsset}
          renderItem={renderCard}
          extraData={listOfAsset}
          keyExtractor={item => item.id}
          ListEmptyComponent={emptyComp}
        />
      </View>

      <TouchableOpacity
        style={styles.floatBtn}
        onPress={() => navigation.navigate('createassets')}>
        <AntDesign name="plus" size={scale(18)} color={Colors.white} />
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default ListOfAssets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: scale(60),
    padding: scale(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: scale(18),
    color: Colors.white,
  },
  listContainer: {
    width: '90%',
    alignSelf: 'center',
  },
  card: {
    width: '100%',
    padding: scale(8),
    height: scale(130),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: scale(8),
    marginVertical: scale(8),
    backgroundColor: Colors.white,
    justifyContent: 'space-between',
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
  emptyImgStyle: {
    height: scale(500),
    width: '100%',
    resizeMode: 'contain',
  },
  emptyTxt: {
    fontSize: scale(22),
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
