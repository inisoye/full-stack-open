import React, { useState } from 'react';

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('');

  if (!props.show) {
    return null;
  }

  const books = props.books;
  const filteredBooks = books.filter((book) => {
    if (!selectedGenre) return true;
    return book.genres.includes(selectedGenre);
  });
  const allGenres = books.map((book) => book.genres).flat();
  const allGenresWithoutDuplicates = [...new Set(allGenres)];

  return (
    <div>
      <h2>books</h2>

      {!!selectedGenre && (
        <p>
          in genre <strong>{selectedGenre}</strong>
        </p>
      )}

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

      <div>
        {allGenresWithoutDuplicates.map((genre) => (
          <button key={genre} onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        ))}
        <button onClick={() => setSelectedGenre('')}>all genres</button>
      </div>
    </div>
  );
};

export default Books;
