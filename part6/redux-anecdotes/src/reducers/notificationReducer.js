const initialState = '';

// Reducer

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.data;

    case 'HIDE_NOTIFICATION':
      return initialState;

    default:
      return state;
  }
};

// Action Creators

const showNotification = (content) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: content,
  };
};

const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  };
};

let timeoutID;

const setNotification = (content, displayDuration) => {
  return async (dispatch) => {
    window.clearTimeout(timeoutID);

    dispatch(showNotification(content));

    timeoutID = window.setTimeout(() => {
      dispatch(hideNotification());
    }, displayDuration * 1000);
  };
};

export { notificationReducer, setNotification };
