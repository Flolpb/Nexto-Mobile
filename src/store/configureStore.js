import {combineReducers, createStore} from 'redux';
import toggleContactFavorite from './reducers/favoriteContactReducer'
import manageContacts from './reducers/contactReducer';
import toggleLogIn from './reducers/logInReducer'

const combinedStore = combineReducers({
    toggleContactFavorite,
    manageContacts,
    toggleLogIn
})

export default createStore(combinedStore)
