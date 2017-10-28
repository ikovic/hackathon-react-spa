import api from 'utils/api';

const initialState = {
  id: null,
  name: '',
  active: false,
  actor: null,
  event: null,
  target: null,
  template: null,
  loading: false,
  error: null,
};

export const UPDATE_NAME = 'seekandhit/editor/UPDATE_NAME';
export const UPDATE_STATUS = 'seekandhit/editor/UPDATE_STATUS';
export const SELECT_TARGET = 'seekandhit/editor/SELECT_TARGET';
export const SELECT_ACTOR = 'seekandhit/editor/SELECT_ACTOR';
export const SELECT_EVENT = 'seekandhit/editor/SELECT_EVENT';
export const SELECT_TEMPLATE = 'seekandhit/editor/SELECT_TEMPLATE';
export const SAVE_PIPELINE = 'seekandhit/editor/SAVE_PIPELINE';
export const SAVE_PIPELINE_SUCCESS = 'seekandhit/editor/SAVE_PIPELINE_SUCCESS';
export const SAVE_PIPELINE_FAIL = 'seekandhit/editor/SAVE_PIPELINE_FAIL';

export const updateName = name => ({ type: UPDATE_NAME, name });

export const updateStatus = status => ({ type: UPDATE_STATUS, status });

export const selectTarget = target => ({ type: SELECT_TARGET, target });

export const selectActor = actor => ({ type: SELECT_ACTOR, actor });

export const selectEvent = event => ({ type: SELECT_EVENT, event });

export const selectTemplate = template => ({ type: SELECT_TEMPLATE, template });

export const savePipeline = () => (dispatch, getState) => {
  dispatch({ type: SAVE_PIPELINE });

  const { editor, actors, events, targets, templates } = getState();

  const pipeline = {
    name: editor.name,
    status: editor.active ? 'active' : 'paused',
    actor: actors.items.find(({ id }) => id === editor.actor),
    event: events.items.find(({ id }) => id === editor.event),
    target: targets.find(({ id }) => id === editor.target),
    template: templates.items.find(({ id }) => id === editor.template),
  };

  api
    .post('/pipelines/create', pipeline)
    .then(response => dispatch({ type: SAVE_PIPELINE_SUCCESS, pipeline: response.data }))
    .catch(error => dispatch({ type: SAVE_PIPELINE_FAIL, error }));
};

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
    case SELECT_TEMPLATE:
      return {
        ...state,
        template: action.template,
      };
    case SAVE_PIPELINE:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case SAVE_PIPELINE_SUCCESS:
      return initialState;
    case SAVE_PIPELINE_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
