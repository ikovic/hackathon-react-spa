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
export const SELECT_TARGET = 'seekandhit/editor/SELECT_TARGET';
export const SELECT_ACTOR = 'seekandhit/editor/SELECT_ACTOR';
export const SELECT_EVENT = 'seekandhit/editor/SELECT_EVENT';

export const updateName = name => ({ type: UPDATE_NAME, name });

export const updateStatus = status => ({ type: UPDATE_STATUS, status });

export const selectTarget = target => ({ type: SELECT_TARGET, target });

export const selectActor = actor => ({ type: SELECT_ACTOR, actor });

export const selectEvent = event => ({ type: SELECT_EVENT, event });

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
    case SELECT_ACTOR:
      return {
        ...state,
        actor: action.actor,
      };
    case SELECT_EVENT:
      return {
        ...state,
        event: action.event,
      };
    case SELECT_TARGET:
      return {
        ...state,
        target: action.target,
      };
    default:
      return state;
  }
}
