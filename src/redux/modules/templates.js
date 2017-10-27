const initialState = {
  items: [
    {
      id: '12315fsefsd',
      link: 'www.link.com',
      name: 'Facebook',
      message: 'Fuk fuk fuk',
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
