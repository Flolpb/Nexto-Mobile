const PROFILE = {
  local: 'http://localhost:8000',
  dev: 'http://192.168.1.22:8000',
  prod: 'https://api.app-nexto.com',
};

/*
  VALEUR A CHANGER EN FONCTION DE LA DESTINATION DES REQUETES
 */

const API = {
  BASE_URL: PROFILE['dev'],
  VALID_TOKEN: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoidGVzdEB0ZXN0LmZyIiwiZXhwIjoxNjE4NjY2NjQ0fQ.FZUR9AyAu_qvd-3zg0kUPA4lTnBHcuM0EwIZpqqxv0c",
}

export default API;

