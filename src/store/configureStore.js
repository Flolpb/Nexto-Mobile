import {combineReducers, createStore} from 'redux';
import toggleContactFavorite from './reducers/favoriteContactReducer'
import manageContacts from './reducers/contactReducer';
import manageLibraries from './reducers/libraryReducer';
import toggleLogIn from './reducers/logInReducer'

const combinedStore = combineReducers({
    toggleContactFavorite,
    manageContacts,
    manageLibraries,
    toggleLogIn
})

export default createStore(combinedStore)
