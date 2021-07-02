import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../reducers/loggedUserReducer';

function Users() {
  const user = useSelector((state) => state.loggedUser);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch;

  const logOut = () => {
    dispatch(logout());
    history.push('/');
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  return (
    <>
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button onClick={logOut}>logout</button>
      </div>

      <div>
        <h2>Users</h2>
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Users;
