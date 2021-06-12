import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, blogs, setBlogs, likeBlog }) => {
  const [areDetailsOpen, setAreDetailsOpen] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const detailsStyle = {
    display: areDetailsOpen ? 'block' : 'none',
  };

  const deleteBlog = (id, title, author) => {
    const isDeletionConfirmed = window.confirm(
      `Remove blog ${title} by ${author}?`
    );

    if (isDeletionConfirmed) {
      blogService.del(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));
      });
    }
  };

  return (
    <div style={blogStyle}>
      <p>
        <span>{blog.title} </span>by
        <span> {blog.author} </span>
        <button
          type="button"
          className="details-button"
          onClick={() => setAreDetailsOpen(!areDetailsOpen)}
        >
          {areDetailsOpen ? 'hide' : 'view'}
        </button>
      </p>

      <div style={detailsStyle}>
        <p className="url">{blog.url}</p>

        <p className="likes">
          likes {blog.likes}{' '}
          <button
            type="button"
            className="like-button"
            onClick={() => likeBlog(blog.id)}
          >
            like
          </button>
        </p>

        <p>{blog.user?.name}</p>

        {blog.user && (
          <button onClick={() => deleteBlog(blog.id, blog.title, blog.author)}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};
export default Blog;
