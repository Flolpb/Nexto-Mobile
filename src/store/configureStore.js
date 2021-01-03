import {combineReducers, createStore} from 'redux';
import toggleContactFavorite from './reducers/favoriteContactReducer'


const combinedStore = combineReducers({
  toggleContactFavorite,
})

export default createStore(combinedStore)
