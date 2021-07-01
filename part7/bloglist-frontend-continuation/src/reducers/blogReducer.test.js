import deepFreeze from 'deep-freeze';
import { blogReducer } from './blogReducer';

describe('when blog reducer has undefined state', () => {
  test('should return initial state', () => {
    const initialState = [];
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = blogReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});

describe('when blog reducer is initialised with existing blogs', () => {
  const initialState = [
    {
      likes: 8,
      title: 'first blog',
      author: 'first author',
      url: 'http://first-url.com',
      user: {
        username: 'sample-user',
        name: 'sample-user',
        id: '60cc6bef8ccaf00a3773c01a',
      },
      id: '60cc6bf18ccaf00a3773c01b',
    },
    {
      likes: 2,
      title: 'second blog',
      author: 'second author',
      url: 'http://second-url.com',
      user: {
        username: 'sample-user',
        name: 'sample-user',
        id: '60cc6bef8ccaf00a3773c01a',
      },
      id: '60cc6bf28ccaf00a3773c01c',
    },
    {
      likes: 2,
      title: 'third blog',
      author: 'third author',
      url: 'http://third-url.com',
      user: {
        username: 'sample-user',
        name: 'sample-user',
        id: '60cc6bef8ccaf00a3773c01a',
      },
      id: '60cc6bf38ccaf00a3773c01d',
    },
  ];

  test('should allow blogs to be liked', () => {
    // Test with first blog
    const firstBlogID = initialState[0].id;

    const action = {
      type: 'LIKE_BLOG',
      data: { id: firstBlogID },
    };

    const state = initialState;

    const blogToChange = state.find((a) => a.id === firstBlogID);
    const updatedBlog = {
      ...blogToChange,
      likes: blogToChange.likes + 1,
    };
    const updatedState = state.map((blog) =>
      blog.id !== firstBlogID ? blog : updatedBlog
    );

    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toEqual(updatedState);
  });

  test('should allow the addition of new blogs', () => {
    const action = {
      type: 'NEW_BLOG',
      data: {
        likes: 8,
        title: 'test blog',
        author: 'test author',
        url: 'http://test-url.com',
        user: {
          username: 'sample-user',
          name: 'sample-user',
          id: '60cc6bef8ccaf00a3773c01a',
        },
        id: '60cc6bf18ccaf00a3773c01b',
      },
    };

    const state = initialState;

    const updatedState = [
      ...state,
      {
        likes: 8,
        title: 'test blog',
        author: 'test author',
        url: 'http://test-url.com',
        user: {
          username: 'sample-user',
          name: 'sample-user',
          id: '60cc6bef8ccaf00a3773c01a',
        },
        id: '60cc6bf18ccaf00a3773c01b',
      },
    ];

    deepFreeze(state);
    const newState = blogReducer(state, action);
    expect(newState).toEqual(updatedState);
  });

  test('should allow the addition of new blogs', () => {
    const addAction = {
      type: 'NEW_BLOG',
      data: {
        likes: 8,
        title: 'test blog',
        author: 'test author',
        url: 'http://test-url.com',
        user: {
          username: 'sample-user',
          name: 'sample-user',
          id: '60cc6bef8ccaf00a3773c01a',
        },
        id: '60cc6bf18cca271HSajAc01b',
      },
    };

    const delAction = {
      type: 'DELETE_BLOG',
      data: { id: '60cc6bf18cca271HSajAc01b' },
    };

    const state = initialState;

    deepFreeze(state);
    blogReducer(state, addAction);
    const stateWithDeletedBlog = blogReducer(state, delAction);
    expect(stateWithDeletedBlog).toEqual(initialState);
  });
});
