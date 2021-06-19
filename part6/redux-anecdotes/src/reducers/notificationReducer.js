const initialState = '';

// Reducer

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data;

    case 'DELETE_NOTIFICATION':
      return initialState;

    default:
      return state;
  }
};

// Action Creators

const setNotification = (content) => {
  return {
    type: 'SET_NOTIFICATION',
    data: content,
  };
};

const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
  };
};

export { notificationReducer, setNotification, deleteNotification };
