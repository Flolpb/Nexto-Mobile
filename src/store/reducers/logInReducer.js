const initialState = {
    isLogged: false,
    mail: '',
    userID: null,
  }
function toggleLogIn(state = initialState, action) {
  let nextState;
    switch (action.type) {
      case 'TOGGLE_LOGIN':
        nextState = {
          ...state,
          isLogged: !state.isLogged,
          mail: state.isLogged ? '' : action.mail
        }
        return nextState || state
      case 'TOGGLE_LOGOUT':
        nextState = {
          ...state,
          isLogged: false,
          mail: '',
          userID: '',
        }
        return nextState || state
      case 'STORE_USER':
        nextState = {
          ...state,
          userID: action.userID
        }
        return nextState || state
      default:
        return state
    }
}

export default toggleLogIn
