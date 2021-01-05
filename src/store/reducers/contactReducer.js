const initialState = {
  contacts: []
};

function manageContacts(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'STORE_CONTACTS':
      nextState = {
        ...state,
        contacts: action.contacts
      };
      return nextState || state;
   default:
      return state
  }
}

export default manageContacts;
