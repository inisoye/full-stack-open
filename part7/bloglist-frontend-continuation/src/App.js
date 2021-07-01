import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Blog from './components/Blog';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

import { logout } from './reducers/loggedUserReducer';
import { like, createBlog, initializeBlogs } from './reducers/blogReducer';

const App = () => {
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.loggedUser);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
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

    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const toggleBlogFormVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const orderLikesDescending = (a, b) => {
    return a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0;
  };

  const likeBlog = (id) => {
    const blogToChange = blogs.find((blog) => blog.id === id);

    dispatch(like(blogToChange));
  };

  const addBlog = async (newBlog) => {
    await dispatch(createBlog(newBlog));

    // Close form only when addition is successful
    toggleBlogFormVisibility();
  };

  return (
    <>
      <Notification
        message={notification?.content}
        type={notification?.messageType}
      />

      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <LoginForm />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>

          <p>
            {user.name} logged in <button onClick={logOut}>log out</button>
          </p>

          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <CreateBlogForm
              blogs={blogs}
              toggleBlogFormVisibility={toggleBlogFormVisibility}
              createBlog={addBlog}
            />
          </Togglable>

          {blogs?.sort(orderLikesDescending).map((blog) => (
            <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
