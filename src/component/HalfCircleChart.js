import React from 'react';
import {ProgressCircle} from 'react-native-svg-charts';
import {scale} from '../utils/Matrix';
import {StyleSheet} from 'react-native';

const HalfCircleChart = ({apiData}) => {
  const {workingDaysCount, todayDayCount} = apiData;
  const data = [
    {value: workingDaysCount, color: 'green'},
    {value: workingDaysCount - todayDayCount, color: 'red'},
  ];


  return (
    <ProgressCircle
      style={styles.proBar}
      progress={0.9}
      progressColor={'#8641f4'}
      startAngle={-Math.PI * 0.5}
      endAngle={Math.PI * 0.5}
      strokeWidth={20}
      cornerRadius={0}
      backgroundColor={'#edece8'}
    />
  );
};

export default HalfCircleChart;

const styles = StyleSheet.create({
  proBar: {
    height: scale(120),
    width: '40%',
    overflow: 'hidden',
    marginTop: scale(40),
    marginHorizontal: scale(20),
  },
});
