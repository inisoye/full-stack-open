import React, { useState } from 'react';
import blogService from '../services/blogs';

function CreateBlogForm({
  blogs,
  setBlogs,
  setNotificationMessage,
  setNotificationType,
}) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url,
    };

    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        setBlogs([...blogs, returnedBlog]);

        setTitle('');
        setAuthor('');
        setUrl('');

        setNotificationMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} has been added!`
        );
        setNotificationType('confirmation');

        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
        setNotificationMessage(`there was an error adding your entry`);
        setNotificationType('error');

        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
  };

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>

      <label>
        title:
        <input
          type="text"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </label>

      <br />

      <label>
        author:
        <input
          type="text"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </label>

      <br />

      <label>
        url:
        <input
          type="text"
          name="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </label>

      <br />

      <button type="submit">create</button>
    </form>
  );
}

export default CreateBlogForm;
