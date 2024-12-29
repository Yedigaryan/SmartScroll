import { createFeatureSelector, createSelector } from '@ngrx/store';

import { SearchState } from '../reducers/search.reducer';

export const selectSearchState = createFeatureSelector<SearchState>('search');

export const selectResults = createSelector(
  selectSearchState,
  (state) => state.comments
);

export const selectSearchQueries = createSelector(
  selectSearchState,
  (state) => state.queries
);

export const selectLoading = createSelector(
  selectSearchState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectSearchState,
  (state) => state.error
);

export const selectLoadMore = createSelector(
  selectSearchState,
  (state) => state.loadMore
);
