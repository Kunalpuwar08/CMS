import axios from 'axios';
import {API_URL} from '../constant';

const callSaveFcm = async (userId, fcmToken) => {
  await axios
    .post(`${API_URL}/addfcm`, {userId, fcmToken})
    .then(res => console.log(res.data, 'FCM ADD RESPONCE'))
    .catch(err => console.log('FCM ADD ERROR'));
};

export default callSaveFcm;
