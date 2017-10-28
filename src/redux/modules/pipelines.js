const initialState = {
  items: [
    {
      id: 1,
      title: 'prvi',
      status: 'active',
      actor: 'Manchester United',
      event: 'Scoring a goal',
      target: 'Facebook',
    },
    {
      id: 2,
      title: 'drugi',
      status: 'paused',
      actor: 'Manchester United',
      event: 'Scoring a goal',
      target: 'Facebook',
    },
    {
      id: 3,
      title: 'treci',
      status: 'deleted',
      actor: 'Manchester United',
      event: 'Scoring a goal',
      target: 'Facebook',
    },
    {
      id: 4,
      title: 'cetvrti',
      status: 'paused',
      actor: 'Manchester United',
      event: 'Scoring a goal',
      target: 'Facebook',
    },
    {
      id: 5,
      title: 'peti',
      status: 'active',
      actor: 'Manchester United',
      event: 'Scoring a goal',
      target: 'Facebook',
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
