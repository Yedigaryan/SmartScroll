import { createReducer, on } from '@ngrx/store';
import * as SearchActions from '../actions/search.actions';
import {IComment} from '../../interfaces/model-types.interface';

export interface SearchState {
  queries: string[];
  results: any[];
  error: string | null;
}

export interface MockDataState {
  comments: IComment[];
  error: string | null;
}

export const mockInitialState: SearchState = {
  queries: [],
  results: [],
  error: null,
};

export const initialState: MockDataState = {
  comments: [],
  error: null,
};

export const searchReducer = createReducer(
  initialState,
  on(SearchActions.loadResultsSuccess, (state, { results }) => ({
    ...state,
    results,
  })),
  on(SearchActions.saveQuery, (state, { query }) => ({
    ...state,
    queries: [...((state as unknown) as SearchState).queries, query],
  })),
  on(SearchActions.loadResultsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export const mockDataReducer = createReducer(
  initialState,
  on(SearchActions.loadCommentsSuccess, (state, { comments }) => ({
    ...state,
    comments,
  })),
  on(SearchActions.loadCommentsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
