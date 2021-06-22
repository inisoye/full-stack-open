import deepFreeze from 'deep-freeze';
import { filterReducer } from './filterReducer';

const initialState = '';

describe('filter reducer', () => {
  test('should return initial state when reducer has undefined state', () => {
    const action = {
      type: 'DO_NOTHING',
    };

    const newState = filterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('should return user input as filter', () => {
    const action = {
      type: 'SET_FILTER',
      data: 'anything',
    };

    const state = initialState;

    deepFreeze(state);
    const newState = filterReducer(state, action);
    expect(newState).toEqual('anything');
  });
});
