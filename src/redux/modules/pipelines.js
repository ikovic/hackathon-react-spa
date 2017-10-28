import apiClient from 'utils/api';

export const PIPELINES = 'seekandhit/pipelines/PIPELINES';
export const PIPELINES_SUCCESS = 'seekandhit/pipelines/PIPELINES_SUCCESS';
export const PIPELINES_FAIL = 'seekandhit/pipelines/PIPELINES_FAIL';

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
