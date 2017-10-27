const initialState = {
  id: null,
  name: '',
  active: false,
  actor: null,
  event: null,
  target: null,
  template: null,
};

export const UPDATE_NAME = 'seekandhit/editor/UPDATE_NAME';

export const updateName = name => ({ type: UPDATE_NAME, name });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.name,
      };
    default:
      return state;
  }
}
