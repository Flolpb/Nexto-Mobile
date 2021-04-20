const initialState = {
  libraries: [],
  lastAddedLibrary: null,
};

function manageLibraries(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'STORE_LIBRARIES':
      nextState = {
        ...state,
        libraries: action.libraries
      };
      return nextState || state;
    case 'ADD_LIBRARY':
      nextState = {
        ...state,
        lastAddedLibrary: action.library,
        libraries: [...state.libraries, action.library]
      }
      return nextState || state;
    case 'RESET_ON_LOGOUT':
      return initialState;
    default:
      return state
  }
}

export default manageLibraries;
