import {createReducer, on} from '@ngrx/store';
import * as SearchActions from '../actions/search.actions';
import {IComment} from '../../interfaces/model-types.interface';

export interface SearchState {
  queries: string[];
  results: any[];
  error: string | null;
}

interface IQuery {
  query: string;
  timestamp: number;
  resultCount: number;
}

export interface MockDataState {
  queries: IQuery[],
  comments: IComment[];
  error: string | null;
}

export const mockInitialState: SearchState = {
  queries: [],
  results: [],
  error: null,
};

export const initialState: MockDataState = {
  queries: [],
  comments: [],
  error: null,
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.loadResultsSuccess, (state, {results}) => ({
    ...state,
    results,
  })),
  on(SearchActions.saveSearchQuery, (state, {query, resultCount}) => ({
    ...state,
    queries: [
      {
        query,
        timestamp: Date.now(),
        resultCount
      },
      ...state.queries.slice(0, 9) // Keep last 10 queries
    ]
  })),
  on(SearchActions.loadResultsFailure, (state, {error}) => ({
    ...state,
    error,
  }))
);

export const mockDataReducer = createReducer(
  initialState,
  on(SearchActions.loadCommentsSuccess, (state, {comments}) => ({
    ...state,
    comments,
  })),
  on(SearchActions.loadCommentsFailure, (state, {error}) => ({
    ...state,
    error,
  }))
);
