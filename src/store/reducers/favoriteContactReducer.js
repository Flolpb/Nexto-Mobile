const initialState = {
  favoritesContact: []
}

function toggleContactFavorite(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'TOGGLE_FAVORITE':
      const favoriteContactIndex = state.favoritesContact.findIndex(item => parseInt(item) === parseInt(action.id))
      if (favoriteContactIndex !== -1) {
        nextState = {
          ...state,
          favoritesContact: state.favoritesContact.filter( (item, index) => index !== favoriteContactIndex)
        }
      }
      else {
        nextState = {
          ...state,
          favoritesContact: [...state.favoritesContact, action.id]
        }
      }
      return nextState || state
    default:
      return state
  }
}

export default toggleContactFavorite
