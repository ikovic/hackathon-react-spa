const initialState = {
  items: [
    {
      id: 'al3fs3kwdapoi00',
      name: 'Finishes game',
    },
    {
      id: 'lkasjo09adl',
      name: 'Wins a Point',
    },
    {
      id: 'slkd9s8f0dsv',
      name: 'Loses a Point',
    },
  ],
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
