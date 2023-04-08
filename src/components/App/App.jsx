import { useReducer } from 'react';
// import useLocalStorage from 'hooks/useLocalStorage';
import { Container, TitleForm, TitleContacts, Info } from './App.styled';
import ContactForm from '../ContactForm/ContactForm';
import ContactsList from '../ContactsList/ContactsList';
import Filter from '../Filter/Filter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import reducer from 'reducer';

// const KEY_CONTACTS = 'contacts';

const App = () => {
  // const [contacts, setContacts] = useLocalStorage(KEY_CONTACTS, []);
  // const [filter, setFilter] = useState('');

  const [state, dispatch] = useReducer(reducer, {});

  const addContact = (userName, userNumber) => {
    dispatch({
      type: 'add',
      payload: [userName, userNumber],
    });
  };

  const updateFilter = data => {
    dispatch({
      type: 'filter',
      payload: data,
    });
  };

  const deleteContact = id => {
    dispatch({
      type: 'delete',
      payload: id,
    });
  };

  return (
    <Container>
      <TitleForm>Phonebook</TitleForm>
      <ContactForm addContact={addContact} />
      {!state.contacts || state.contacts.length === 0 ? (
        <Info>No contacts.</Info>
      ) : (
        <>
          <TitleContacts>Contacts</TitleContacts>
          <Filter filter={state.filter} updateFilter={updateFilter} />
        </>
      )}
      <ContactsList
        contacts={
          (state.visibleFriends && state.visibleFriends.length > 0) ? state.visibleFriends : (state.contacts || [])
        }
        deleteContact={deleteContact}
      />
      <ToastContainer />
    </Container>
  );
};

export default App;
