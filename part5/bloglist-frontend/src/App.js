import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('confirmation');

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

  return (
    <>
      <Notification message={notificationMessage} type={notificationType} />

      {user === null ? (
        <div>
          <h2>log in to application</h2>
          <LoginForm
            setUser={setUser}
            setNotificationMessage={setNotificationMessage}
            setNotificationType={setNotificationType}
          />
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
              setNotificationMessage={setNotificationMessage}
              setNotificationType={setNotificationType}
              toggleBlogFormVisibility={toggleBlogFormVisibility}
            />
          </Togglable>

          {blogs?.sort(orderLikesDescending).map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              blogs={blogs}
              setBlogs={setBlogs}
              setNotificationMessage={setNotificationMessage}
              setNotificationType={setNotificationType}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
