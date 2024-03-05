import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import {requestNotificationPermission} from './src/common/notificationPermissions';
import handleNotification from './src/common/handleNotification';
import {saveData} from './src/component/CommonStorage';
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(() => {
    const requestPermissionAndLogStatus = async () => {
      const enabled = await requestNotificationPermission();

      if (enabled) {
        console.log('Notification permission granted');
      } else {
        console.log('Notification permission denied');
      }
    };

    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) {
          console.log(fcmToken, 'FCM>>>>>>>>>>>>>>>>>>>>>');
          saveData('FcmToken', fcmToken);
        } else {
          console.error('No FCM token available');
        }
      })
      .catch(error => {
        console.error('Error retrieving FCM token:', error);
      });

    handleNotification();
    requestPermissionAndLogStatus();
  }, []);

  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Toast />
    </PaperProvider>
  );
};

export default App;
