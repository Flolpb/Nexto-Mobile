import API from '../../config/api';
import axios from 'axios';

const USER_HELPER_URL = API.BASE_URL + '/api/users';

const UserHelper = {
  getAllUsers: async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': await API.VALID_TOKEN(),
      };
      return (await axios.get(USER_HELPER_URL, {headers})).data['hydra:member'];
    } catch (err) {
      console.log(err)
    }
  },
  getUserById: async (id) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': await API.VALID_TOKEN(),
      };
      return (await axios.get(`${USER_HELPER_URL}/${id}`, { headers })).data;
    } catch (err) {
      console.log(err)
    }
  },
  
}

export default UserHelper;
