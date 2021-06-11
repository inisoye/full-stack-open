import React, { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({
  blog,
  blogs,
  setBlogs,
  setNotificationMessage,
  setNotificationType,
}) => {
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

  const likeBlog = (id) => {
    const blog = blogs.find((blog) => blog.id === id);
    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    blogService
      .update(id, updatedBlog)
      .then(() =>
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
      )
      .catch(() => {
        setNotificationMessage(
          `${blog.title} has already been removed from the server`
        );
        setNotificationType('error');

        setTimeout(() => {
          setNotificationMessage(null);
        }, 5000);
      });
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
          onClick={() => setAreDetailsOpen(!areDetailsOpen)}
        >
          {areDetailsOpen ? 'hide' : 'view'}
        </button>
      </p>
      <div style={detailsStyle}>
        <p>{blog.url}</p>
        <p>
          likes {blog.likes}{' '}
          <button type="button" onClick={() => likeBlog(blog.id)}>
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
