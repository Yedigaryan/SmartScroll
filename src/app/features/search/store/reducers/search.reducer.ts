import {createReducer, on} from '@ngrx/store';

import {IComment} from '../../interfaces/model-types.interface';
import * as SearchActions from '../actions/search.actions';
import * as Query from '../actions/query.actions';

export interface SearchState {
  queries: string[],
  comments: IComment[];
  error: string | null;
  loading: boolean;
  loadMore: boolean;
}

export const initialState: SearchState = {
  queries: [],
  comments: [],
  error: null,
  loading: false,
  loadMore: false,
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.loadResults, (state) => ({
    ...state,
    error: null,
    loading: true,
  })),
  on(SearchActions.loadResultsSuccess, (state, {results, addToExisting}) => ({
    ...state,
    comments: addToExisting ? [...state.comments, ...results] : results,
    error: null,
    loading: false,
    loadMore: results.length > 0,
  })),
  on(SearchActions.loadResultsFailure, (state, {error}) => ({
    ...state,
    error,
    loading: false,
    loadMore: false,
  })),
  on(Query.queryActions, (state, {query}) => ({
    ...state,
    queries: state.queries.find(item => item === query) ? state.queries.slice(0 ,9) : [
      query,
      ...state.queries.slice(0, 9) // Keep last 10 queries
    ],
  })),
);
