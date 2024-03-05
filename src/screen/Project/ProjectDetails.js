import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {bg} from '../../assets';
import Pdf from 'react-native-pdf';
import {Fonts} from '../../utils/Fonts';
import {scale} from '../../utils/Matrix';
import {Colors} from '../../utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useRoute} from '@react-navigation/native';

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
        <View style={styles.boxDetail}>
          <View style={styles.boxleft}>
            <Text style={styles.boxrow(1)}>Id</Text>
            <Text style={styles.boxrow(1)}>Status</Text>
            <Text style={styles.boxrow(0)}>Priority</Text>
          </View>
          <View style={styles.boxright}>
            <Text style={styles.boxrow(1)} numberOfLines={1}>
              {data?.id}
            </Text>
            <Text style={styles.boxrow(1)}>{data?.status}</Text>
            <Text style={styles.boxrow(0)}>{data?.priority}</Text>
          </View>
        </View>

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
    padding: scale(8),
    height: scale(50),
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Colors.white,
    borderBottomWidth: scale(0.2),
    justifyContent: 'space-between',
  },
  backBtn: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  backTxt: {
    fontSize: scale(15),
    color: Colors.white,
    marginLeft: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  mainView: {
    width: '90%',
    padding: scale(8),
    alignSelf: 'center',
  },
  title: {
    fontSize: scale(18),
    color: Colors.white,
    fontFamily: Fonts.AntaRegular,
  },
  profile: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.white,
  },
  assignanddate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: scale(12),
  },
  cardDetail: {
    marginLeft: scale(6),
  },
  label: {
    color: Colors.grey,
    fontSize: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  value: {
    color: Colors.white,
    fontSize: scale(14),
    fontFamily: Fonts.AntaRegular,
  },
  desc: {
    color: Colors.white,
    fontSize: scale(12),
    marginVertical: scale(12),
    fontFamily: Fonts.AntaRegular,
  },
  boxDetail: {
    width: '100%',
    height: scale(120),
    alignSelf: 'center',
    borderRadius: scale(8),
    marginVertical: scale(8),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boxleft: {
    width: '40%',
    height: '100%',
    borderRightWidth: 1,
  },
  boxright: {
    width: '60%',
    height: '100%',
  },
  boxrow: width => ({
    height: '33%',
    padding: scale(8),
    borderBottomWidth: width,
    textAlignVertical: 'center',
    fontFamily: Fonts.AntaRegular,
    color: Colors.black,
  }),
});
