// actions.ts
export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';
export const EDIT_CONTACT = 'EDIT_CONTACT';

export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
}

export const addContact = (contact: Omit<Contact, 'id'>) => ({
  type: ADD_CONTACT,
  payload: {
    ...contact,
    id: Date.now(),
  },
});

export const deleteContact = (id: number) => ({
  type: DELETE_CONTACT,
  payload: id,
});

export const editContact = (contact: Contact) => ({
  type: EDIT_CONTACT,
  payload: contact,
});
