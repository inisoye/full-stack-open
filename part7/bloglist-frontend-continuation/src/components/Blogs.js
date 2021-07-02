import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Togglable from './Togglable';
import CreateBlogForm from './CreateBlogForm';
import Blog from './Blog';

import { logout } from '../reducers/loggedUserReducer';
import { like, createBlog } from '../reducers/blogReducer';

function Blogs() {
  const user = useSelector((state) => state.loggedUser);
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();
  const history = useHistory();

  const blogFormRef = useRef();

  const toggleBlogFormVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const addBlog = async (newBlog) => {
    await dispatch(createBlog(newBlog));

    // Close form only when addition is successful
    toggleBlogFormVisibility();
  };

  const orderLikesDescending = (a, b) => {
    return a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0;
  };

  const likeBlog = (id) => {
    const blogToChange = blogs.find((blog) => blog.id === id);

    dispatch(like(blogToChange));
  };

  const logOut = () => {
    dispatch(logout());
    history.push('/');
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  return (
    <div>
      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={logOut}>log out</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateBlogForm createBlog={addBlog} />
      </Togglable>

      {blogs?.sort(orderLikesDescending).map((blog) => (
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      ))}
    </div>
  );
}

export default Blogs;
