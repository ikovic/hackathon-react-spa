import apiClient from 'utils/api';
import { EVENTS_SUCCESS, EVENTS_FAIL } from './events';

export const ACTORS = 'seekandhit/actors/ACTORS';
export const ACTORS_SUCCESS = 'seekandhit/actors/ACTORS_SUCCESS';
export const ACTORS_FAIL = 'seekandhit/actors/ACTORS_FAIL';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ACTORS:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case ACTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.actors,
        error: null,
      };
    case ACTORS_FAIL:
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

export const getActors = () => dispatch => {
  dispatch({ type: ACTORS });
  apiClient
    .get('/actors/')
    .then(response => {
      const actors = response.data.actors;
      const events = response.data.events;
      dispatch({ type: ACTORS_SUCCESS, actors });
      dispatch({ type: EVENTS_SUCCESS, events });
    })
    .catch(error => {
      dispatch({ type: ACTORS_FAIL, error });
      dispatch({ type: EVENTS_FAIL, error });
    });
};
