import React, { useEffect } from 'react';

const Recommendations = ({ show, currentUser, books, getFilteredBooks }) => {
  const favoriteGenre = currentUser?.me?.favoriteGenre;

  useEffect(() => {
    show && getFilteredBooks({ variables: { genreToSearch: favoriteGenre } });
  }, [getFilteredBooks, show, favoriteGenre]);

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>reccommendations</h2>

      <p>
        books in your favorite genre <strong>{favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
