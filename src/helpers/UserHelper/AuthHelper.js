import API from '../../config/api';
import axios from 'axios';

const USER_HELPER_URL = API.BASE_URL + '/api/users';

const AuthHelper = {
    
    login: async (formData) => {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'WWW-Authenticate': 'mobile',
          };
          return (await axios.post(`${API.BASE_URL}/auth/login`, formData, {headers})).data;
        } catch (err) {
          console.log(err);
        }
      },
    remember: async () => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': await API.VALID_TOKEN(),
            };
            return (await axios.get(`${API.BASE_URL}/auth/remember`, {headers})).data;
        } catch (err) {
          console.log(err);
        }
    },
    register: async (formData) => {
        try {
          const headers = {
            'Content-Type': 'application/json',
            'WWW-Authenticate': 'mobile',
          };
          return (await axios.post(`${API.BASE_URL}/auth/register`, formData, {headers})).data;
        } catch (err) {
          console.log(err);
        }
      },
}

export default AuthHelper;