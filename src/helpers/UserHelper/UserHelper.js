import API from '../../config/api';
import axios from 'axios';

const USER_HELPER_URL = API.BASE_URL + "api/users/";

const UserHelper = {
  getAllUsers: () => {
    const headers = {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': API.VALID_TOKEN,
    };
    axios.get(USER_HELPER_URL, headers)
      .then(response => {
        return response.data['hydra:member']
      })
      .catch(error => console.log(error));
  },
  getUserById: (id) => {
    axios.get(USER_HELPER_URL + id)
      .then(response =>  response.data)
      .catch(error => console.log(error));
  },
  login: () => {
    const headers = {
      'Accept': 'application/json;charset=utf-8',
      'Content-Type': 'application/json;charset=utf-8',
      'Authorization': "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoidGVzdEB0ZXN0LmZyIiwiZXhwIjoxNjE4Njg2NzkzfQ._4Piq19DwZtnYCp46fzttckFaukVaH9wU9_7TtgWBYI",
    };
    axios.post(API.BASE_URL + "auth/login/", {
      mail: "test@test.fr",
      password: "1234",
    }, headers)
      .then(response =>  response.data['hydra:member'])
      .catch(error => console.log(error));
  }
}

export default UserHelper;
