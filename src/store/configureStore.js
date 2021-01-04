import {combineReducers, createStore} from 'redux';
import toggleContactFavorite from './reducers/favoriteContactReducer'
import manageContacts from './reducers/contactReducer';


const combinedStore = combineReducers({
  toggleContactFavorite,
  manageContacts,
})

export default createStore(combinedStore)
