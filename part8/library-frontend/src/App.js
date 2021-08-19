import React, { useState } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import LoginForm from './components/LoginForm';
import Authors from './components/Authors';
import Books from './components/Books';
import Recommendations from './components/Recommendations';
import NewBook from './components/NewBook';
import { ALL_AUTHORS, ALL_BOOKS, GET_ME } from './queries';

const App = () => {
  const savedToken = window.localStorage.getItem('phonenumbers-user-token');
  const [token, setToken] = useState(savedToken);
  const [page, setPage] = useState('authors');
  const authorsResult = useQuery(ALL_AUTHORS);
  const booksResult = useQuery(ALL_BOOKS);
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

      <Books show={page === 'books'} books={booksResult.data?.allBooks} />

      <Recommendations
        show={page === 'recommend'}
        books={booksResult.data?.allBooks}
        currentUser={currentUser.data}
      />

      <NewBook show={page === 'add'} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
