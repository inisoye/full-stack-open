const initialState = '';

// Reducer

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.data;

    default:
      return state;
  }
};

// Action Creators

const setFilter = (content) => {
  return {
    type: 'SET_FILTER',
    data: content,
  };
};

export { filterReducer, setFilter };
