const initialState = [
  {
    id: '123321',
    name: 'Facebook',
    type: 'facebook',
  },
  {
    id: '312sff',
    name: 'Twitter',
    type: 'twitter',
  },
  {
    id: 'asd43f4f',
    name: 'Instagram',
    type: 'instagram',
  },
  {
    id: 'asde44g4',
    name: 'Pinterest',
    type: 'pinterest',
  },
];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
