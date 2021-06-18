import React, { useState } from 'react';
import PropTypes from 'prop-types';
import loginService from '../services/login';

function LoginForm({ setUser, setNotificationMessage, setNotificationType }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotificationMessage('wrong username or password');
      setNotificationType('error');

      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          id="username"
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          id="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );
}

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  setNotificationType: PropTypes.func.isRequired,
};

export default LoginForm;
