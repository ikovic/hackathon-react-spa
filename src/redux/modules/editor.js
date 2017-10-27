const initialState = {
  id: null,
  name: '',
  active: false,
  actor: null,
  event: null,
  target: null,
  template: null,
};

export const UPDATE = 'seekandhit/editor/update';

export const update = pipeline => ({ type: UPDATE, pipeline });

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.pipeline,
      };
    default:
      return state;
  }
}
