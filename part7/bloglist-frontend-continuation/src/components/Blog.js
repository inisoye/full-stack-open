import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { del } from '../reducers/blogReducer';

const Blog = ({ blog, likeBlog }) => {
  const [areDetailsOpen, setAreDetailsOpen] = useState(false);

  const dispatch = useDispatch();

  const detailsStyle = {
    display: areDetailsOpen ? 'block' : 'none',
  };

  const deleteBlog = (id, title, author) => {
    const isDeletionConfirmed = window.confirm(
      `Remove blog ${title} by ${author}?`
    );

    if (isDeletionConfirmed) {
      dispatch(del(id));
    }
  };

  return (
    <div
      className="rounded-lg p-3 border-2 border-green-400 border-opacity-40 max-w-max space-y-2"
      data-cy="blog-container"
    >
      <p>
        <Link to={`/blogs/${blog.id}`} style={{ marginRight: '5px' }}>
          <span>{blog.title} </span>by
          <span> {blog.author} </span>
        </Link>
        <button
          type="button"
          className="details-button ml-2"
          data-cy="details-button"
          onClick={() => setAreDetailsOpen(!areDetailsOpen)}
        >
          {areDetailsOpen ? 'hide details' : 'view details'}
        </button>
      </p>

      <div style={detailsStyle} className="space-y-2">
        <p className="url">{blog.url}</p>

        <p className="likes">
          likes <span data-cy="likes">{blog.likes} </span>
          <button
            type="button"
            className="like-button"
            data-cy="like-button"
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
