const initialState = {
  items: [
    {
      id: 1,
      title: 'prvi',
      status: 'active',
    },
    {
      id: 2,
      title: 'drugi',
      status: 'paused',
    },
    {
      id: 3,
      title: 'treci',
      status: 'deleted',
    },
    {
      id: 4,
      title: 'cetvrti',
      status: 'paused',
    },
    {
      id: 5,
      title: 'peti',
      status: 'active',
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
