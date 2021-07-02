import userService from '../services/users';

// Reducer

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;

    default:
      return state;
  }
};

const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();

    dispatch({
      type: 'INIT_USERS',
      data: users,
    });
  };
};

export { userReducer, initializeUsers };
