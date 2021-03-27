import { useReducer } from 'react';
import {
  UPDATE_STORIES,
  UPDATE_NOTES,
  UPDATE_CURRENT_STORY,
  //ADD_NOTE_TO_STORY,

} from './actions';

export const reducer = (state, action) => {
  switch (action.type) {
    // if action type value is the value of `UPDATE_ITEMS`, return a new state object with an updated items array
    case UPDATE_STORIES:
      return {
        ...state,
        stories: [...action.stories],
      };

    // if action type value is the value of `UPDATE_CATEGORIES`, return a new state object with an updated categories array
    case UPDATE_NOTES:
      return {
        ...state,
        notes: [...action.notes],
      };

    case UPDATE_CURRENT_STORY:
      return {
        ...state,
        currentStory: action.currentStory,
      };

    default:
      return state;
  }
};

export function useItemReducer(initialState) {
  return useReducer(reducer, initialState);
}