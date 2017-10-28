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

export const ADD_TEMPLATE = 'seekandhit/templates/ADD_TEMPLATE';

export const addTemplate = template => ({
  type: ADD_TEMPLATE,
  template: { ...template, id: String(Date.now()) },
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TEMPLATE:
      return {
        ...state,
        items: [...state.items, action.template],
      };
    default:
      return state;
  }
}
