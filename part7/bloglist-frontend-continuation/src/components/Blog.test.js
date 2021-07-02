import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
// https://stackoverflow.com/a/63513874/15063835
import { MemoryRouter } from 'react-router-dom';

import Blog from './Blog';

// Add fake redux store creator
// https://github.com/vercel/next.js/issues/8145
const mockStore = configureStore();
let store;

test('renders blog author and title and not url or likes', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Sample Author',
  };

  store = mockStore(blog);

  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    </Provider>
  );

  // visible elements
  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
  expect(component.container).toHaveTextContent('Sample Author');

  // hidden elements
  const url = component.container.querySelector('.url');
  expect(url).not.toBeVisible();
  const likes = component.container.querySelector('.likes');
  expect(likes).not.toBeVisible();
});

test('hide and show details when button is clicked', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Sample Author',
    url: 'Sample Url',
    likes: 4,
  };

  store = mockStore(blog);

  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Blog blog={blog} />
      </MemoryRouter>
    </Provider>
  );
  const detailsButton = component.container.querySelector('.details-button');
  fireEvent.click(detailsButton);

  const url = component.container.querySelector('.url');
  expect(url).toBeVisible();
  const likes = component.container.querySelector('.likes');
  expect(likes).toBeVisible();
});

test('clicking like button twice calls event handler twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Sample Author',
    url: 'Sample Url',
    likes: 4,
  };

  const mockHandler = jest.fn();
  store = mockStore(blog);

  const component = render(
    <Provider store={store}>
      <MemoryRouter>
        <Blog blog={blog} likeBlog={mockHandler} />
      </MemoryRouter>
    </Provider>
  );

  const likeButton = component.container.querySelector('.like-button');
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
