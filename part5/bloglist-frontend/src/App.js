import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import CreateBlogForm from './components/CreateBlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('confirmation');

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

          <CreateBlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            setNotificationMessage={setNotificationMessage}
            setNotificationType={setNotificationType}
          />

          {blogs?.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
