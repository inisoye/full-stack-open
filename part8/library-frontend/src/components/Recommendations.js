import React from 'react';

const Recommendations = (props) => {
  if (!props.show) {
    return null;
  }

  const { favoriteGenre } = props.currentUser.me;

  const books = props.books;

  const filteredBooks = books?.filter((book) => {
    return book.genres.includes(favoriteGenre);
  });

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
          {filteredBooks?.map((a) => (
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
