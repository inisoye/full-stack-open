import React, { useState, useEffect } from 'react';

const Books = ({
  show,
  books: allBooks,
  getAllBooks,
  getFilteredBooks,
  filteredBooks,
}) => {
  const [selectedGenre, setSelectedGenre] = useState('');
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAllBooks();

    if (!selectedGenre) {
      setBooks(allBooks);
      return;
    }

    show && getFilteredBooks({ variables: { genreToSearch: selectedGenre } });
    setBooks(filteredBooks);
  }, [
    getFilteredBooks,
    getAllBooks,
    show,
    allBooks,
    filteredBooks,
    selectedGenre,
  ]);

  if (!show) {
    return null;
  }

  const allGenres = allBooks?.map((book) => book.genres).flat();
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
          {books?.map((a) => (
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
        <button
          onClick={() => {
            setSelectedGenre('');
          }}
        >
          all genres
        </button>
      </div>
    </div>
  );
};

export default Books;
