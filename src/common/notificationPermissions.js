import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

export async function requestNotificationPermission() {
  let authStatus;

  if (Platform.OS === 'ios') {
    // For iOS, request permission directly
    authStatus = await messaging().requestPermission();
  } else if (Platform.OS === 'android') {
    // For Android, request permission using PermissionsAndroid
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, // You can adjust the permission based on your needs
      {
        title: 'Notification Permission',
        message: 'This app needs access to send you notifications.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    authStatus = granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  return authStatus;
}
