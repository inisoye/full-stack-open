import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { like } from '../reducers/blogReducer';
import { initializeComments, createComment } from '../reducers/commentReducer';

function SingleBlogPage() {
  const [comment, setComment] = useState('');
  let { id } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const comments = useSelector((state) => state.comments);

  const dispatch = useDispatch();

  const selectedBlog = blogs.find((blog) => blog.id === id);

  useEffect(() => {
    dispatch(initializeComments(id));
  }, [dispatch]);

  const likeBlog = (id) => {
    const blogToChange = blogs.find((blog) => blog.id === id);

    dispatch(like(blogToChange));
  };

  const addComment = () => {
    event.preventDefault();

    const newComment = {
      content: comment,
    };

    dispatch(createComment(newComment, id));
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

      <div>
        <h3>comments</h3>

        <form onSubmit={addComment}>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button>add comment</button>
        </form>

        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>{comment.content}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SingleBlogPage;
