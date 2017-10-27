const initialState = [
  {
    id: '123321',
    title: 'Facebook',
    type: 'facebook',
  },
  {
    id: '312sff',
    title: 'Twitter',
    type: 'twitter',
  },
  {
    id: 'asd43f4f',
    title: 'Instagram',
    type: 'instagram',
  },
  {
    id: 'asde44g4',
    title: 'Pinterest',
    type: 'pinterest',
  },
];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
