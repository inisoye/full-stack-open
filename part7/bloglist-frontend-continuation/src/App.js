import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Blog from './components/Blog';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const notification = useSelector((state) => state.notification);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem('loggedBlogAppUser');
  };

  const toggleBlogFormVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const orderLikesDescending = (a, b) => {
    return a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0;
  };

  const likeBlog = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, updatedBlog)
      .then(() =>
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      )
      .catch(() => {
        dispatch(
          setNotification(
            `${blog.title} has already been removed from the server`,
            'error',
            3
          )
        );
      });
  };

  const addBlog = (newBlog) => {
    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        setBlogs([...blogs, returnedBlog]);

        // Close form only when addition is successful
        toggleBlogFormVisibility();

        dispatch(
          setNotification(
            `a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added!`,
            'confirmation',
            3
          )
        );
      })
      .catch((error) => {
        console.log(error);

        dispatch(
          setNotification('there was an error adding your entry', 'error', 3)
        );
      });
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
          <LoginForm setUser={setUser} />
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
              setBlogs={setBlogs}
              toggleBlogFormVisibility={toggleBlogFormVisibility}
              createBlog={addBlog}
            />
          </Togglable>

          {blogs?.sort(orderLikesDescending).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              likeBlog={likeBlog}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
