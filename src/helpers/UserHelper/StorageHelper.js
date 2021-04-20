import API from '../../config/api';
import axios from 'axios';

const USER_HELPER_URL = API.BASE_URL + '/api/users';

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
          await AsyncStorage.setItem('AUTH_USER_ID', id).then(async () => {
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