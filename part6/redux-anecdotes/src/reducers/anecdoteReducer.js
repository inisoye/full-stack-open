import anecdoteService from '../services/anecdotes';

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

const vote = (anecdoteToChange) => {
  return async (dispatch) => {
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };

    const returnedAnecdote = await anecdoteService.update(changedAnecdote);
    const { id } = returnedAnecdote;

    dispatch({
      type: 'VOTE_FOR_ANECDOTE',
      data: { id },
    });
  };
};

const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);

    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();

    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export { anecdoteReducer, vote, createAnecdote, initializeAnecdotes };
