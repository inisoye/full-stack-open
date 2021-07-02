import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';

import Blogs from './components/Blogs';
import Users from './components/Users';
import User from './components/User';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import SingleBlogPage from './components/SingleBlogPage';

import blogService from './services/blogs';

import { initializeBlogs } from './reducers/blogReducer';
import { initializeUsers } from './reducers/userReducer';
import { logout } from './reducers/loggedUserReducer';

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

  const logOut = () => {
    dispatch(logout());
    history.push('/');
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  return (
    <>
      <Notification
        message={notification?.content}
        type={notification?.messageType}
      />

      <div style={{ display: 'flex' }}>
        <nav style={{ marginRight: '5px' }}>
          <ul style={{ display: 'flex', listStyle: 'none', paddingLeft: '0' }}>
            <li style={{ marginRight: '5px' }}>
              <Link to="/blogs">blogs</Link>
            </li>
            <li>
              <Link to="/users">users</Link>
            </li>
          </ul>
        </nav>

        <p>
          <span style={{ marginRight: '5px' }}>{user.name} logged in</span>
          <button onClick={logOut}>logout</button>
        </p>
      </div>

      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>

        <Route path="/blogs/:id">
          <SingleBlogPage />
        </Route>

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
