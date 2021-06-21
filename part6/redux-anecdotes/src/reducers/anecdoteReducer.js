// Reducer

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE_FOR_ANECDOTE':
      const id = action.data.id;
      const anecdoteToChange = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );

    case 'NEW_ANECDOTE':
      return [...state, action.data];

    case 'INIT_ANECDOTES':
      return action.data;

    default:
      return state;
  }
};

// Action Creators

const vote = (id) => {
  return {
    type: 'VOTE_FOR_ANECDOTE',
    data: { id },
  };
};

const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: { content, votes: 0 },
  };
};

const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export { anecdoteReducer, vote, createAnecdote, initializeAnecdotes };
