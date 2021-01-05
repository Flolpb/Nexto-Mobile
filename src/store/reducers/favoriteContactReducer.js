import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  favoritesContact: []
};

async function readData(){
  try{
    console.log('test wesh');
    const jsonValue = await AsyncStorage.getItem('favorite');
    const value = JSON.parse(jsonValue);
    if(jsonValue != null){
      initialState.favoritesContact = value.favoritesContact;
    }
  }catch(e){
    console.log(e);
  }
}


async function saveData(value){
  try{
    const jsonValue = JSON.stringify(value);
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
          favoritesContact: state.favoritesContact.filter((item, index) => index !== favoriteContactIndex)
        };
      } else {
        nextState = {
          ...state,
          favoritesContact: [...state.favoritesContact, action.id]
        };
      }
      saveData(nextState).then();
      return nextState || state;
    case 'READ_FAVORITES':
      readData().then();
      return state;
    default:
      return state;
  }
}

export default toggleContactFavorite
