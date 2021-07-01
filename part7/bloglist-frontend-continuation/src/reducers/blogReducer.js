import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';

// Reducer

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE_BLOG': {
      const id = action.data.id;
      const blogToChange = state.find((b) => b.id === id);
      const updatedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    }

    case 'NEW_BLOG':
      return [...state, action.data];

    case 'DELETE_BLOG': {
      const id = action.data.id;
      return state.filter((blog) => blog.id !== id);
    }

    case 'INIT_BLOGS':
      return action.data;

    default:
      return state;
  }
};

// Action Creators

const like = (blogToChange) => {
  return async (dispatch) => {
    try {
      const updatedBlog = { ...blogToChange, likes: blogToChange.likes + 1 };

      const returnedBlog = await blogService.update(updatedBlog);
      const { id } = returnedBlog;

      dispatch({
        type: 'LIKE_BLOG',
        data: { id },
      });
    } catch (error) {
      dispatch(
        setNotification(
          `${blogToChange.title} has already been removed from the server`,
          'error',
          3
        )
      );
    }
  };
};

const del = (id) => {
  return async (dispatch) => {
    await blogService.del(id);

    dispatch({
      type: 'DELETE_BLOG',
      data: { id },
    });
  };
};

const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(content);

      dispatch({
        type: 'NEW_BLOG',
        data: newBlog,
      });

      dispatch(
        setNotification(
          `a new blog ${newBlog.title} by ${newBlog.author} has been added!`,
          'confirmation',
          3
        )
      );
    } catch (error) {
      console.log(error);

      dispatch(
        setNotification('there was an error adding your entry', 'error', 3)
      );
    }
  };
};

const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export { blogReducer, like, createBlog, del, initializeBlogs };
