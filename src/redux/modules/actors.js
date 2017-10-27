const initialState = {
  items: [
    {
      id: '123ssrgdsrgs',
      name: 'Rafael Nadal',
      type: 'player',
    },
    {
      id: 'asdalkj9i90',
      name: 'Roger Federer',
      type: 'player',
    },
    {
      id: 'Barsdkjah0',
      name: 'Barcelona',
      type: 'club',
    },
    {
      id: 'efbeo94084',
      name: 'Omiski Gusar',
      type: 'club',
    },
    {
      id: '666satanas',
      name: 'Zoltan Dosa',
      type: 'player',
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
