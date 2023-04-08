import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';

export default function reducer(state, action) {
  switch (action.type) {
    case 'add':
      if (!state.contacts) state.contacts = [];
      if (state.contacts.some(el => el.name === action.payload[0])) {
        toast.warn(`${action.payload[0]} is already in contacts.`, {
          theme: 'colored',
        });
        return state;
      } else {
        return {
          ...state,
          contacts: [
            {
              name: action.payload[0],
              number: action.payload[1],
              id: nanoid(),
            },
            ...state.contacts,
          ],
        };
      }

    case 'delete':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        ),
      };

    case 'filter':
      return {
        ...state,
        filter: action.payload,
        visibleFriends: state.contacts.filter(el =>
          el.name.toLowerCase().includes(action.payload.trim())
        ),
      };

    default:
      return state;
  }
}
