import API from '../../config/api';
import axios from 'axios';

const LIBRARY_HELPER_URL = API.BASE_URL + "/api/libraries";

const LibraryHelper = {
  getAllLibraries: async (filters) => {
    try {
      const headers = {
        "Content-Type": 'application/json',
        "Authorization": await API.VALID_TOKEN(),
      };
      return (await axios.get(LIBRARY_HELPER_URL, {
        params: {
          ...filters
        },
        headers
      })).data['hydra:member'];
    } catch (err) {
      console.log(err)
      return false;
    }
  },
  getLibraryById: async (id) => {
    try {
      const headers = {
        "Content-Type": 'application/json',
        "Authorization": await API.VALID_TOKEN(),
      };
      return (await axios.get(`${LIBRARY_HELPER_URL}/${id}`, { headers })).data;
    } catch (err) {
      console.log(err)
    }
  },
  createLibrary: async (library) => {
    try {
      const headers = {
        "Content-Type": 'application/json',
        "Authorization": await API.VALID_TOKEN(),
      };
      return (await axios.post(LIBRARY_HELPER_URL, library,{ headers })).data;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  updateLibrary: async (id, library) => {
    try {
      const headers = {
        "Content-Type": 'application/json',
        "Authorization": await API.VALID_TOKEN(),
      };
      return (await axios.put(`${LIBRARY_HELPER_URL}/${id}`, library,{ headers })).data;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  deleteLibrary: async (id) => {
    try {
      const headers = {
        "Content-Type": 'application/json',
        "Authorization": await API.VALID_TOKEN(),
      };
      return (await axios.delete(`${LIBRARY_HELPER_URL}/${id}`, { headers })).data;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default LibraryHelper;
