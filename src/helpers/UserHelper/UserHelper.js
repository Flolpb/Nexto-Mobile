import API from '../../config/api';
import axios from 'axios';

const USER_HELPER_URL = API.BASE_URL + "/api/users";

const UserHelper = {
  getAllUsers: () => {
    const headers = {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': API.VALID_TOKEN,
    };
    axios.get(USER_HELPER_URL, headers)
      .then(response => response.data['hydra:member'])
      .catch(error => console.log(error));
  },
  getUserById: (id) => {
    const headers = {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': API.VALID_TOKEN,
    };
    axios.get(`${USER_HELPER_URL}/${id}`)
      .then(response =>  response.data)
      .catch(error => console.log(error));
  },
  login: () => {
    const headers = {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8',
    };
    axios.post(`${API.BASE_URL}/auth/login`, {
      "mail": "test@test.fr",
      "password": "1234",
    }, headers)
      .then(response => response.data)
      .catch(error => console.log(error));
  }
}

export default UserHelper;
