const LOAD = 'hackathon/example/load';

const initialState = {
  someStuff: 'foo',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        someStuff: 'bar',
      };
    default:
      return state;
  }
};

export default reducer;
