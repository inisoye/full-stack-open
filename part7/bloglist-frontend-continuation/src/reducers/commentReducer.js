import commentService from '../services/comments';

// Reducer

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_COMMENT':
      return [...state, action.data];

    case 'INIT_COMMENTS':
      return action.data;

    default:
      return state;
  }
};

// Action Creators

const createComment = (content, blogID) => {
  return async (dispatch) => {
    const newComment = await commentService.create(content, blogID);

    dispatch({
      type: 'NEW_COMMENT',
      data: newComment,
    });
  };
};

const initializeComments = (blogID) => {
  return async (dispatch) => {
    const comments = await commentService.getAll(blogID);

    dispatch({
      type: 'INIT_COMMENTS',
      data: comments,
    });
  };
};
export { commentReducer, createComment, initializeComments };
