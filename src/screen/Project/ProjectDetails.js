import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {bg} from '../../assets';
import {scale} from '../../utils/Matrix';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../utils/Colors';
import {Fonts} from '../../utils/Fonts';

const ProjectDetails = () => {
  const route = useRoute();
  const data = route.params.item;
  const navigation = useNavigation();

  return (
    <ImageBackground source={bg} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          activeOpacity={0.9}
          onPress={() => navigation.goBack()}>
          <AntDesign name={'left'} size={scale(18)} color={Colors.white} />
          <Text style={styles.backTxt}>Project Details</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainView}>
        <Text style={styles.title}>{data.name}</Text>
        <View style={styles.assignanddate}>
          <View style={styles.card}>
            <View style={styles.profile} />
            <View style={styles.cardDetail}>
              <Text style={styles.label}>Assigned to</Text>
              <Text style={styles.value}>{data?.assignTo}</Text>
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.profile} />
            <View style={styles.cardDetail}>
              <Text style={styles.label}>Due Date</Text>
              <Text style={styles.value}>{data?.deadlineDate}</Text>
            </View>
          </View>
        </View>
        <View style={{marginVertical: scale(12)}}>
          <Text style={styles.title}>Descriptiopn</Text>
          <Text style={styles.desc}>{data?.description}</Text>
        </View>
        <Text style={styles.title}>Task Details</Text>
        <View style={styles.boxDetail}></View>
      </View>
    </ImageBackground>
  );
};

export default ProjectDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(8),
    borderBottomWidth: scale(0.2),
    borderColor: Colors.white,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backTxt: {
    fontSize: scale(15),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    marginLeft: scale(12),
  },
  mainView: {
    width: '90%',
    alignSelf: 'center',
    padding: scale(8),
  },
  title: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
  profile: {
    height: scale(40),
    width: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.white,
  },
  assignanddate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(12),
  },
  cardDetail: {
    marginLeft: scale(6),
  },
  label: {
    color: Colors.grey,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(12),
  },
  value: {
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(14),
  },
  desc: {
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(12),
    marginVertical: scale(12),
  },
  boxDetail: {
    width: '100%',
    alignSelf: 'center',
    height: scale(120),
    backgroundColor: Colors.grey,
    borderRadius: scale(8),
    marginVertical: scale(8),
  },
});
