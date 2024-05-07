// ContactPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addContact, deleteContact, editContact, Contact } from '../actions';

const ContactPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const contacts = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch();

  const handleAddClick = () => {
    setCurrentContact({ id: Date.now(), firstName: '', lastName: '' }); // Use a proper ID generation in a real app
    setShowModal(true);
  };

  const handleEditClick = (contact: Contact) => {
    setCurrentContact(contact);
    setShowModal(true);
  };

  const handleDeleteClick = (id: number) => {
    dispatch(deleteContact(id));
  };

  const handleCancel = () => {
    setShowModal(false);
    setCurrentContact(null);
  };

  const handleSave = () => {
    if (currentContact) {
      if (contacts.some(contact => contact.id === currentContact.id)) {
        dispatch(editContact(currentContact));
      } else {
        dispatch(addContact({ firstName: currentContact.firstName, lastName: currentContact.lastName }));
      }
    }
    setShowModal(false);
    setCurrentContact(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'firstName' | 'lastName') => {
    setCurrentContact(prev => ({ ...prev, [field]: e.target.value } as Contact));
  };

  return (
    <div className="container mx-auto p-4">
      <main className="mt-8">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddClick}
        >
          Add Contact
        </button>

        <div className="mt-6">
          {contacts.length > 0 ? (
            contacts.map(contact => (
              <div key={contact.id} className="flex items-center justify-between mt-4 bg-white p-4 rounded shadow">
                <div>
                  <p className="text-lg">{contact.firstName} {contact.lastName}</p>
                </div>
                <div>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-3 rounded mr-2"
                    onClick={() => handleEditClick(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                    onClick={() => handleDeleteClick(contact.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4 text-gray-600">There are no contacts. Add a new contact to get started.</p>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-6">{currentContact?.id ? 'Edit Contact' : 'Add Contact'}</h2>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={currentContact?.firstName || ''}
                  onChange={(e) => handleChange(e, 'firstName')}
                  className="border-2 border-gray-300 rounded py-2 px-4 w-full mb-4"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={currentContact?.lastName || ''}
                  onChange={(e) => handleChange(e, 'lastName')}
                  className="border-2 border-gray-300 rounded py-2 px-4 w-full"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSave}
                >
                  {currentContact?.id ? 'Save Edit' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ContactPage;
