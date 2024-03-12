import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import {API_URL} from '../constant';
import {getData} from '../component/CommonStorage';

export const UserAuthContext = createContext();

const UserAuthProvider = ({children}) => {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await getData('userAuth');
      const token = storedData?.token;
      setToken(token);

      const getID = storedData?.user?.id;

      await axios
        .get(`${API_URL}/getEmployee/${getID}`, {
          headers: {'Content-Type': 'application/json', Authorization: token},
        })
        .then(res => setUserData(res?.data.data))
        .catch(err => console.log(err, 'Error in getting data by id'));
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  return (
    <UserAuthContext.Provider value={{token, userData}}>
      {children}
    </UserAuthContext.Provider>
  );
};

export default UserAuthProvider;
