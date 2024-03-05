import messaging from '@react-native-firebase/messaging';
import { AppState } from 'react-native';

const handleNotification = () => {
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // Register foreground handler
//   messaging().onNotification(async remoteMessage => {
//     console.log('Message handled in the foreground!', remoteMessage);
//     // Add your logic to handle the notification while the app is in the foreground
//   });

  // Check the app state
  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'active') {
      console.log('App is in the foreground');
      // You can perform additional actions when the app comes to the foreground
    } else {
      console.log('App is in the background');
      // You can perform additional actions when the app goes to the background
    }
  };

  // Add listener for app state changes
  AppState.addEventListener('change', handleAppStateChange);

  // Return a cleanup function
  return () => {
    // Remove the listener when the component unmounts
    AppState.removeEventListener('change', handleAppStateChange);
  };
};

export default handleNotification;
