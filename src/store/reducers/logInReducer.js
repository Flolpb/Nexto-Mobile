const initialState = {
    isLogged: false,
    username: 'Anonyme'
  }
  
  function toggleLogIn(state = initialState, action) {
    let nextState;
    switch (action.type) {
      case 'TOGGLE_LOGIN':
        if(state.isLogged)
        {
            nextState = {
                ...state,
                isLogged: false,
                username: 'Anonyme'
            }
        }
        else
        {
            nextState = {
                ...state,
                isLogged: true,
                username: action.username
            }
        }
        return nextState || state
      default:
        return state
    }
  }
  
  export default toggleLogIn