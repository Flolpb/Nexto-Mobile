import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE = {
  local: 'http://localhost:8000',
  dev: 'http://192.168.1.22:8000',
  prod: 'https://api.app-nexto.com',
};

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
      return null
    }
  },
  USER_ID: async () => {
    try {
      return (await AsyncStorage.getItem('AUTH_USER_ID').then(data => {
        if (data !== null) {
          // We have data!!
          return data
        }
      }))

    } catch (error) {
      // Error retrieving data
      console.log(error)
      return null
    }
  },
}

export default API;

