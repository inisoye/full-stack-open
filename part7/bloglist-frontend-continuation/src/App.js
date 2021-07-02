import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Blogs from './components/Blogs';
import Users from './components/Users';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

import blogService from './services/blogs';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';

const App = () => {
  const notification = useSelector((state) => state.notification);
  const user = useSelector((state) => state.loggedUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <>
      <Notification
        message={notification?.content}
        type={notification?.messageType}
      />

      <Switch>
        <Route path="/users">
          <Users />
        </Route>

        <Route path="/blogs">
          <Blogs />
        </Route>

        <Route path="/">
          {user ? <Redirect to="/blogs" /> : <LoginForm />}
        </Route>
      </Switch>
    </>
  );
};

export default App;
