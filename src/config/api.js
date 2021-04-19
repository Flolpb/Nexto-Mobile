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
  VALID_TOKEN: "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtYWlsIjoidGVzdDJAdGVzdC5mciIsImV4cCI6MTYxODc0NDM1OX0.vWo--iCzVJRV-7xTfGuIkxF6Vvx7ScN5x_cG9_g73io",
}

export default API;

