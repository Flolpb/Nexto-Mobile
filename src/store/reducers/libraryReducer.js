const initialState = {
  libraries: []
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
      }
      return nextState || state;
    default:
      return state
  }
}

export default manageLibraries;
