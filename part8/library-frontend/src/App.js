import React, { useState } from 'react';
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client';
import LoginForm from './components/LoginForm';
import Authors from './components/Authors';
import Books from './components/Books';
import Recommendations from './components/Recommendations';
import NewBook from './components/NewBook';
import { ALL_AUTHORS, ALL_BOOKS, GET_ME, ALL_BOOKS_BY_GENRE } from './queries';

const App = () => {
  const savedToken = window.localStorage.getItem('library-user-token');
  const [token, setToken] = useState(savedToken);
  const [page, setPage] = useState('authors');
  const authorsResult = useQuery(ALL_AUTHORS);
  const [getAllBooks, allBooksResult] = useLazyQuery(ALL_BOOKS);
  const [getFilteredBooks, filteredBooksResult] =
    useLazyQuery(ALL_BOOKS_BY_GENRE);
  const currentUser = useQuery(GET_ME);
  const client = useApolloClient();

  const logout = () => {
    setPage('login');
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!!token && <button onClick={() => setPage('add')}>add book</button>}
        {!!token && (
          <button onClick={() => setPage('recommend')}>recommend</button>
        )}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {!!token && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        authors={authorsResult.data?.allAuthors}
      />

      <Books
        show={page === 'books'}
        books={allBooksResult.data?.allBooks}
        filteredBooks={filteredBooksResult.data?.allBooks}
        getAllBooks={getAllBooks}
        getFilteredBooks={getFilteredBooks}
      />

      <Recommendations
        show={page === 'recommend'}
        books={filteredBooksResult.data?.allBooks}
        currentUser={currentUser.data}
        getFilteredBooks={getFilteredBooks}
      />

      <NewBook show={page === 'add'} getFilteredBooks={getFilteredBooks} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
