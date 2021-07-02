import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../reducers/loggedUserReducer';
import { setNotification } from '../reducers/notificationReducer';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log('logging in with', username, password);

    try {
      await dispatch(login(username, password));

      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 3));
    }
  };

  return (
    <div className="space-y-4">
      <h2>log in to application</h2>
      <form className="space-y-4" onSubmit={handleLogin}>
        <div>
          username
          <input
            className="mt-4 ml-2"
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
            className="mt-4 ml-2"
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
    </div>
  );
}

export default LoginForm;
