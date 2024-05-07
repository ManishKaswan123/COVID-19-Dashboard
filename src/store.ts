// store.ts
import { createStore } from 'redux';
import { Contact, ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from './actions';

interface State {
  contacts: Contact[];
}

const initialState: State = {
  contacts: [],
};

const reducer = (state = initialState, action: any): State => {
  switch (action.type) {
    case ADD_CONTACT:
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload),
      };
    case EDIT_CONTACT:
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export type RootState = ReturnType<typeof store.getState>;
export default store;
