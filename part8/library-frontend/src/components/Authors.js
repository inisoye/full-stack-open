import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries';

const Authors = (props) => {
  const [name, setName] = useState('');
  const [born, setBorn] = useState('');

  console.log(Number(born));

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const authors = props.authors;

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({ variables: { name, setBornTo: Number(born) } });

    setName('');
    setBorn('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors?.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <h2>Set birthyear</h2>

        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
