import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageHelper = {

    _storeToken: async (token) => {
        try {
          await AsyncStorage.setItem('AUTH_TOKEN', token).then(async () => {
            return true
          })
        } catch (error) {
          // Error saving data
          return false
        }
      },

      _clearToken: async () => {
        try {
          await AsyncStorage.setItem('AUTH_TOKEN', '').then(async () => {
            return true
          })
        } catch (error) {
          // Error saving data
          return false
        }
      },

      _storeUserId: async (id) => {
        try {
          await AsyncStorage.setItem('AUTH_USER_ID', id.toString()).then(async () => {
            return true
          })
        } catch (error) {
          // Error saving data
          return false
        }
      },

      _clearUserId: async () => {
        try {
          await AsyncStorage.setItem('AUTH_USER_ID', '').then(async () => {
            return true
          })
        } catch (error) {
          // Error saving data
          return false
        }
      },
}

export default StorageHelper;
