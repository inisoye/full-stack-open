import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import CreateBlogForm from './CreateBlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();

  const component = render(<CreateBlogForm createBlog={createBlog} />);

  const titleInput = component.getByLabelText('title:');
  const authorInput = component.getByLabelText('author:');
  const urlInput = component.getByLabelText('url:');
  const form = component.container.querySelector('form');

  fireEvent.change(titleInput, {
    target: { value: 'A random blog' },
  });
  fireEvent.change(authorInput, {
    target: { value: 'Random Author' },
  });
  fireEvent.change(urlInput, {
    target: { value: 'http://random.com' },
  });
  fireEvent.submit(form);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('A random blog');
  expect(createBlog.mock.calls[0][0].author).toBe('Random Author');
  expect(createBlog.mock.calls[0][0].url).toBe('http://random.com');
});
