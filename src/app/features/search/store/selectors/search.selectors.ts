import { createFeatureSelector, createSelector } from '@ngrx/store';
import {MockDataState, SearchState} from '../reducers/search.reducer';

export const selectSearchState = createFeatureSelector<SearchState>('search');
export const selectMockDataState = createFeatureSelector<MockDataState>('mockData');

export const selectQueries = createSelector(
  selectSearchState,
  (state) => state.queries
);

export const selectResults = createSelector(
  selectSearchState,
  (state) => state.results
);


export const selectComments = createSelector(
  selectMockDataState,
  (state) => state?.comments ?? []
);

export const selectSearchQueries = createSelector(
  selectSearchState,
  (state) => state.queries
);
