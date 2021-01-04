import { createStore, combineReducers } from 'redux';
import toggleFavorite from './reducers/favoriteReducer'
import toggleLogIn from './reducers/logInReducer'

const combinedStore = combineReducers({
    toggleFavorite,
    toggleLogIn
})

export default createStore(combinedStore)
