import {inject, Injectable} from '@angular/core';

import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {EMPTY, of} from 'rxjs';

import * as SearchActions from '../actions/search.actions';
import * as Query from '../actions/query.actions';
import {SearchService} from '../../services/search.service';

@Injectable()
export class SearchEffects {
  private actions$ = inject(Actions);
  private searchService = inject(SearchService);

  loadResults$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.loadResults),
      switchMap(({query, page, limit, addToExisting}) =>
        this.searchService.searchComments(query, page, limit).pipe(
          map((results) => {
            return SearchActions.loadResultsSuccess({results, addToExisting, query})
          }),
          catchError((error) =>
            of(SearchActions.loadResultsFailure({error}))
          )
        )
      )
    )
  });

  saveQuery$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SearchActions.loadResultsSuccess),
      switchMap(({query, results}) => {

          if (query && query.length >= 3 && results.length > 0) {
            return of(Query.queryActions({
              query: query,
            }))
          }

          return EMPTY;
        }
      )
    )
  });
}
