import React, { useState } from 'react';
import {
  useQuery,
  useLazyQuery,
  useSubscription,
  useApolloClient,
} from '@apollo/client';
import LoginForm from './components/LoginForm';
import Authors from './components/Authors';
import Books from './components/Books';
import Recommendations from './components/Recommendations';
import NewBook from './components/NewBook';
import {
  ALL_AUTHORS,
  ALL_BOOKS,
  GET_ME,
  ALL_BOOKS_BY_GENRE,
  BOOK_ADDED,
} from './queries';

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

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} has been added`);
      updateCacheWith(addedBook);
    },
  });

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
        {!!token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
        {!token && <button onClick={() => setPage('login')}>login</button>}
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

      <NewBook show={page === 'add'} updateCacheWith={updateCacheWith} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  );
};

export default App;
