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
export const UPDATE_STATUS = 'seekandhit/editor/UPDATE_STATUS';

export const updateName = name => ({ type: UPDATE_NAME, name });

export const updateStatus = status => ({ type: UPDATE_STATUS, status });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NAME:
      return {
        ...state,
        name: action.name,
      };
    case UPDATE_STATUS:
      return {
        ...state,
        active: action.status,
      };
    default:
      return state;
  }
}
