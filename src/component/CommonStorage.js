import AsyncStorage from "@react-native-async-storage/async-storage";


export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true; // Indicates success
  } catch (error) {
    console.log('Error saving data: ', error);
    return false; // Indicates failure
  }
};

// Function to retrieve data from AsyncStorage
export const getData = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data != null ? JSON.parse(data) : null; // Parses JSON data if present
  } catch (error) {
    console.log('Error getting data: ', error);
    return null;
  }
};

// Function to update data in AsyncStorage
export const updateData = async (key, value) => {
  try {
    await AsyncStorage.mergeItem(key, JSON.stringify(value));
    return true; // Indicates success
  } catch (error) {
    console.log('Error updating data: ', error);
    return false; // Indicates failure
  }
};

// Function to delete data from AsyncStorage
export const deleteData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true; // Indicates success
  } catch (error) {
    console.log('Error deleting data: ', error);
    return false; // Indicates failure
  }
};
