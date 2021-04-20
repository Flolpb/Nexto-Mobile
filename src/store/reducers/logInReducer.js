const initialState = {
    isLogged: false,
    username: ''
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
      default:
        return state
    }
}

export default toggleLogIn
