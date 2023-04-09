import { useReducer, useEffect } from 'react';
import useLocalStorage from 'hooks/useLocalStorage';

import { ToastContainer, toast } from 'react-toastify';

import reducer from 'utils/reducer';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';

import 'react-toastify/dist/ReactToastify.css';
import { Container, TitleForm, TitleContacts, Info } from './App.styled';

const KEY_CONTACTS = 'contacts';
const INITIAL_STAT = {
  contacts: [],
  filter: '',
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STAT);

  const [contacts, setContacts] = useLocalStorage(KEY_CONTACTS, []);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    setContacts(state.contacts);
  }, [setContacts, state]);

  const addContact = contact => {
    const duplicate = state.contacts.some(
      el => el.name.toLowerCase() === contact.name.toLowerCase().trim()
    );
    if (duplicate) {
      toast.warn(`${contact.name} is already in contacts.`, {
        theme: 'colored',
      });
      return;
    }

    dispatch({
      type: 'add',
      payload: contact,
    });
  };

  const deleteContact = id => {
    dispatch({
      type: 'delete',
      payload: id,
    });
  };

  const updateFilter = data => {
    dispatch({
      type: 'filter',
      payload: data,
    });
  };

  const getVisibleContacts = () => {
    const { contacts, filter } = state;
    return contacts.filter(el =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const getLocalStorage = () => {
    dispatch({
      type: 'localStorage',
      payload: contacts,
    });
  };

  return (
    <Container>
      <TitleForm>Phonebook</TitleForm>
      <ContactForm addContact={addContact} />

      {!state.contacts.length && <Info>No contacts.</Info>}

      {state.contacts.length > 0 && (
        <>
          <TitleContacts>Contacts</TitleContacts>
          <Filter filter={state.filter} updateFilter={updateFilter} />
        </>
      )}

      <ContactsList
        contacts={state.contacts ? getVisibleContacts() : state.contacts}
        deleteContact={deleteContact}
      />
      <ToastContainer />
    </Container>
  );
};

export default App;
