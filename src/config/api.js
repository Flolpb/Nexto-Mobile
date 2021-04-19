import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE = {
  local: 'http://localhost:8000',
  dev: 'http://192.168.0.22:8000',
  prod: 'https://api.app-nexto.com',
};

/* const getTokenFromLocalStorage = async () => {
  try {
    console.log('tam')
    const value = await AsyncStorage.getItem('AUTH_TOKEN');
    if (value !== null) {
      // We have data!!
      console.log(value)
      return value
    }
  } catch (error) {
    // Error retrieving data
    return null
  }
}; */

/*
  VALEUR A CHANGER EN FONCTION DE LA DESTINATION DES REQUETES
 */

let API = {
  BASE_URL: PROFILE['prod'],
  VALID_TOKEN: async () => {
    try {
      return (await AsyncStorage.getItem('AUTH_TOKEN').then(data => {
        if (data !== null) {
          // We have data!!
          return data
        }
      }))
      
    } catch (error) {
      // Error retrieving data
      console.log(error)
      return error
    }
  },
}

export default API;

