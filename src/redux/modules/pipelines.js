import apiClient from 'utils/api';

export const PIPELINES = 'seekandhit/pipelines/PIPELINES';
export const PIPELINES_SUCCESS = 'seekandhit/pipelines/PIPELINES_SUCCESS';
export const PIPELINES_FAIL = 'seekandhit/pipelines/PIPELINES_FAIL';

export const PIPELINES_UPDATE = 'seekandhit/pipelines/PIPELINES_UPDATE';
export const PIPELINES_UPDATE_SUCCESS = 'seekandhit/pipelines/PIPELINES_UPDATE_SUCCESS';
export const PIPELINES_UPDATE_FAIL = 'seekandhit/pipelines/PIPELINES_UPDATE_FAIL';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PIPELINES:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PIPELINES_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.pipelines,
        error: null,
      };
    case PIPELINES_FAIL:
      return {
        ...state,
        loading: false,
        items: [],
        error: action.error,
      };
    case PIPELINES_UPDATE:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case PIPELINES_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.items,
        error: null,
      };
    case PIPELINES_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}

export const getPipelines = () => dispatch => {
  dispatch({ type: PIPELINES });
  apiClient
    .get('/pipelines/list')
    .then(response => {
      const pipelines = response.data;
      dispatch({ type: PIPELINES_SUCCESS, pipelines });
    })
    .catch(error => {
      dispatch({ type: PIPELINES_FAIL, error });
    });
};

export const changeStatus = (id, status) => (dispatch, getState) => {
  dispatch({ type: PIPELINES_UPDATE });
  const update = {
    id: id,
    status: status,
  };
  apiClient
    .post('/pipelines/update', update)
    .then(response => {
      const items = getState().pipelines.items.map(item => {
        if (item.id === id) {
          return { ...item, status };
        }
        return item;
      });
      return dispatch({ type: PIPELINES_UPDATE_SUCCESS, items });
    })
    .catch(response => {
      return dispatch({ type: PIPELINES_UPDATE_FAIL });
    });
};
