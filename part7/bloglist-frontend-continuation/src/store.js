import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { notificationReducer } from './reducers/notificationReducer';
import { blogReducer } from './reducers/blogReducer';
import { commentReducer } from './reducers/commentReducer';
import { loggedUserReducer } from './reducers/loggedUserReducer';
import { userReducer } from './reducers/userReducer';

const reducer = combineReducers({
  blogs: blogReducer,
  comments: commentReducer,
  notification: notificationReducer,
  loggedUser: loggedUserReducer,
  users: userReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
