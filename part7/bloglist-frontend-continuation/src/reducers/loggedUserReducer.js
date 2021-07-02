import loginService from '../services/login';

const initialState =
  JSON.parse(window.localStorage.getItem('loggedBlogAppUser')) || null;

// Reducer

const loggedUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.data;

    case 'LOG_OUT':
      return null;

    default:
      return state;
  }
};

// Action Creators

const login = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });

    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

    dispatch({
      type: 'LOG_IN',
      data: user,
    });
  };
};

const logout = () => {
  return {
    type: 'LOG_OUT',
  };
};

export { loggedUserReducer, login, logout };
