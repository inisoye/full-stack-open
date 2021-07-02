import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { like } from '../reducers/blogReducer';

function SingleBlogPage() {
  let { id } = useParams();
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const selectedBlog = blogs.find((blog) => blog.id === id);

  const likeBlog = (id) => {
    const blogToChange = blogs.find((blog) => blog.id === id);

    dispatch(like(blogToChange));
  };

  return (
    <>
      <div>
        <h2>{selectedBlog?.title}</h2>

        <a href={selectedBlog?.url} className="url">
          {selectedBlog?.url}
        </a>

        <p className="likes">
          likes <span data-cy="likes">{selectedBlog?.likes} </span>
          <button
            type="button"
            className="like-button"
            data-cy="like-button"
            onClick={() => likeBlog(selectedBlog?.id)}
          >
            like
          </button>
        </p>

        <p>{selectedBlog?.user?.name}</p>
      </div>
    </>
  );
}

export default SingleBlogPage;
