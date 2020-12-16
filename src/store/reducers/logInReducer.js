const initialState = {
    isLogged: false,
    username: 'Anonyme'
  }
  
  function toggleLogIn(state = initialState, action) {
    let nextState;
    switch (action.type) {
      case 'TOGGLE_LOGIN':
          nextState = {
            ...state,
            isLogged: false,
            username: state.isLogged ? 'Anonyme' : action.username
          }
        return nextState || state
      default:
        return state
    }
  }
  
  export default toggleLogIn