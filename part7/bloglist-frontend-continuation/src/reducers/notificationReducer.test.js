import deepFreeze from 'deep-freeze';
import { notificationReducer } from './notificationReducer';

const initialState = {};

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
      content: 'You performed a random action',
      messageType: 'confirmation',
    };

    const state = initialState;

    deepFreeze(state);
    const newState = notificationReducer(state, action);
    expect(newState).toEqual({
      content: action.content,
      messageType: action.messageType,
    });
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
