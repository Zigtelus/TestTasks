import { combineReducers } from 'redux';

import ReducerReview, { InitialStateReview } from './review/review.reducer.ts';


export const rootReducer = combineReducers({
  review: ReducerReview,
});

export interface RootState {
  review: InitialStateReview
}