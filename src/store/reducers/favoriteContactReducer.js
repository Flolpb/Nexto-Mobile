import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favoritesContact: []
};

async function readData(){
  try{
    const jsonValue = await AsyncStorage.getItem('favorite');
    const value = JSON.parse(jsonValue);
    if(jsonValue != null){
      initialState.favoritesContact = value;
    }
  }catch(e){
    console.log(e);
  }
}

//je sais pas comment provoquer le readData au lancement de l'application depuis ici.
readData().then();

async function saveData(){
  try{
    let favorites = initialState.favoritesContact;
    const jsonValue = JSON.stringify(favorites);
    await AsyncStorage.setItem('favorite', jsonValue);
  }catch(e){
    console.log(e);
  }
}


function toggleContactFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteContactIndex = state.favoritesContact.findIndex(item => parseInt(item) === parseInt(action.id));
      if (favoriteContactIndex !== -1) {
        nextState = {
          ...state,
          favoritesContact: state.favoritesContact.filter( (item, index) => index !== favoriteContactIndex)
        };
        saveData().then();
      }
      else {
        nextState = {
          ...state,
          favoritesContact: [...state.favoritesContact, action.id]
        };
        saveData().then();
      }
      return nextState || state;
    default:
      return state
  }
}

export default toggleContactFavorite
