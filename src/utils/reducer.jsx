export default function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return { ...state, contacts: [...state.contacts, action.payload] };

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
      }
    
    case 'localStorage':
      return {
        ...state,
        contacts: action.payload
      }

    default:
      return state;
  }
}

