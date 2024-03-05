import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Colors} from '../utils/Colors';
import {scale} from '../utils/Matrix';
import moment from 'moment';
import {Fonts} from '../utils/Fonts';

const CDatePicker = ({placeholder,onDateSelect,otherStyle}) => {
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity onPress={() => setOpen(true)} style={[styles.container,otherStyle]}>
        <Text style={styles.date}>{date == null ? placeholder : moment(date).format('ll')}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        open={open}
        date={date ? date : new Date()}
        mode={'date'}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          onDateSelect(date)
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default CDatePicker;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: scale(8),
    marginVertical: scale(12),
    justifyContent: 'center',
    padding: scale(12),
  },
  date: {
    color: Colors.black,
    fontFamily: Fonts.AntaRegular,
    fontSize: scale(14),
  },
});
