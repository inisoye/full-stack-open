import deepFreeze from 'deep-freeze';
import { anecdoteReducer } from './anecdoteReducer';

describe('when anecdote reducer has undefined state', () => {
  test('should return initial state', () => {
    const initialState = [];
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = anecdoteReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});

describe('when anecdote reducer is initialised with existing anecdotes', () => {
  const initialState = [
    {
      content: 'If it hurts, do it more often',
      id: '47145',
      votes: 0,
    },
    {
      content: 'Adding manpower to a late software project makes it later!',
      id: '21149',
      votes: 0,
    },
    {
      content:
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      id: '69581',
      votes: 0,
    },
    {
      content:
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      id: '36975',
      votes: 0,
    },
    {
      content: 'Premature optimization is the root of all evil.',
      id: '25170',
      votes: 0,
    },
    {
      content:
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      id: '98312',
      votes: 0,
    },
  ];

  test('should allow anecdotes to be upvoted', () => {
    // Test with first anecdote
    const firstAnecdoteID = initialState[0].id;

    const action = {
      type: 'VOTE_FOR_ANECDOTE',
      data: { id: firstAnecdoteID },
    };

    const state = initialState;

    const anecdoteToChange = state.find((a) => a.id === firstAnecdoteID);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };
    const updatedState = state.map((anecdote) =>
      anecdote.id !== firstAnecdoteID ? anecdote : changedAnecdote
    );

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual(updatedState);
  });

  test('should allow the addition of new anecdotes', () => {
    const action = {
      type: 'NEW_ANECDOTE',
      data: {
        content: 'Test Anecdote',
        id: '47219',
        votes: 0,
      },
    };

    const state = initialState;

    const updatedState = [
      ...state,
      {
        content: 'Test Anecdote',
        id: '47219',
        votes: 0,
      },
    ];

    deepFreeze(state);
    const newState = anecdoteReducer(state, action);
    expect(newState).toEqual(updatedState);
  });
});
