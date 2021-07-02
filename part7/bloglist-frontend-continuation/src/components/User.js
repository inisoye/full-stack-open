import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function User() {
  let { id } = useParams();
  const users = useSelector((state) => state.users);

  const selectedUser = users.find((user) => user.id === id);

  return (
    <>
      <div>
        <h2>{selectedUser?.name}</h2>
        <h3>added blogs</h3>
        {selectedUser?.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </div>
    </>
  );
}

export default User;
