import React, { useState } from 'react';

function CreateBlogForm({ createBlog }) {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleTitleChange = ({ target }) => {
    setNewTitle(target.value);
  };

  const handleAuthorChange = ({ target }) => {
    setNewAuthor(target.value);
  };

  const handleUrlChange = ({ target }) => {
    setNewUrl(target.value);
  };

  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    createBlog(newBlog);

    setNewTitle('');
    setNewAuthor('');
    setNewUrl('');
  };
  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>

      <label>
        title:
        <input
          type="text"
          name="title"
          id="title"
          value={newTitle}
          onChange={handleTitleChange}
        />
      </label>

      <br />

      <label>
        author:
        <input
          type="text"
          name="author"
          id="author"
          value={newAuthor}
          onChange={handleAuthorChange}
        />
      </label>

      <br />

      <label>
        url:
        <input
          type="text"
          name="url"
          id="url"
          value={newUrl}
          onChange={handleUrlChange}
        />
      </label>

      <br />

      <button type="submit" id="create-blog-button">
        create
      </button>
    </form>
  );
}

export default CreateBlogForm;
