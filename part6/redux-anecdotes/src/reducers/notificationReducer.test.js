import deepFreeze from 'deep-freeze';
import { notificationReducer } from './notificationReducer';

const initialState = '';

describe('notification reducer', () => {
  test('should return initial state when reducer has undefined state', () => {
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = notificationReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('should allow display of notification', () => {
    const action = {
      type: 'SHOW_NOTIFICATION',
      data: 'You voted for a random anecdote by someone',
    };

    const state = initialState;

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual('You voted for a random anecdote by someone');
  });

  test('should allow removal of notification', () => {
    const action = {
      type: 'HIDE_NOTIFICATION',
    };

    const state = initialState;

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
