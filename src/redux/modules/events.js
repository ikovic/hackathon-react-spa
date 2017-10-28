export const EVENTS = 'seekandhit/events/EVENTS';
export const EVENTS_SUCCESS = 'seekandhit/events/EVENTS_SUCCESS';
export const EVENTS_FAIL = 'seekandhit/events/EVENTS_FAIL';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case EVENTS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.events,
        error: null,
      };
    case EVENTS_FAIL:
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };
    default:
      return state;
  }
}
