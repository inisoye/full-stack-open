import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect, Link, useHistory } from 'react-router-dom';

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

  const history = useHistory();

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

      <header className="flex py-4 items-center	">
        <nav className="mr-3 ">
          <ul className="flex pl-3">
            <li className="mr-3">
              <Link to="/blogs">blogs</Link>
            </li>
            <li>
              <Link to="/users">users</Link>
            </li>
          </ul>
        </nav>

        <p>
          <span className="mr-3">{user?.name} logged in</span>
          <button
            className="px-3 rounded-md bg-green-200 hover:bg-green-300"
            onClick={logOut}
          >
            logout
          </button>
        </p>
      </header>

      <h1 className="text-3xl font-bold py-6  ml-6">blog app</h1>

      <div className="px-6">
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
      </div>
    </>
  );
};

export default App;
