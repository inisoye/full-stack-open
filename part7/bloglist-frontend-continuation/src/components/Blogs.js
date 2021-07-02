import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Togglable from './Togglable';
import CreateBlogForm from './CreateBlogForm';
import Blog from './Blog';

import { like, createBlog } from '../reducers/blogReducer';

function Blogs() {
  const blogs = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  const blogFormRef = useRef();

  const toggleBlogFormVisibility = () => {
    blogFormRef.current.toggleVisibility();
  };

  const addBlog = async (newBlog) => {
    await dispatch(createBlog(newBlog));

    // Close form only when addition is successful
    toggleBlogFormVisibility();
  };

  const orderLikesDescending = (a, b) => {
    return a.likes > b.likes ? -1 : b.likes > a.likes ? 1 : 0;
  };

  const likeBlog = (id) => {
    const blogToChange = blogs.find((blog) => blog.id === id);

    dispatch(like(blogToChange));
  };

  return (
    <div className="space-y-4">
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <CreateBlogForm createBlog={addBlog} />
      </Togglable>

      {blogs?.sort(orderLikesDescending).map((blog) => (
        <Blog key={blog.id} blog={blog} likeBlog={likeBlog} />
      ))}
    </div>
  );
}

export default Blogs;
