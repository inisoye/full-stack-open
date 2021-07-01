const initialState = {};

// Reducer

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { content: action.content, messageType: action.messageType };

    case 'HIDE_NOTIFICATION':
      return initialState;

    default:
      return state;
  }
};

// Action Creators

const showNotification = (content, messageType) => {
  return {
    type: 'SHOW_NOTIFICATION',
    content,
    messageType,
  };
};

const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION',
  };
};

let timeoutID;

const setNotification = (content, messageType, displayDuration) => {
  return async (dispatch) => {
    window.clearTimeout(timeoutID);

    dispatch(showNotification(content, messageType));

    timeoutID = window.setTimeout(() => {
      dispatch(hideNotification());
    }, displayDuration * 1000);
  };
};

export { notificationReducer, setNotification };
