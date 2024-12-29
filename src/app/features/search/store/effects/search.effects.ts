import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as SearchActions from '../actions/search.actions';
import {SearchService} from '../../services/search.service';

@Injectable()
export class SearchEffects {
  loadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadResults),
      switchMap(({ query, page, limit }) =>
        this.searchService.searchComments(query, page, limit).pipe(
          map((results) => SearchActions.loadResultsSuccess({ results })),
          catchError((error) =>
            of(SearchActions.loadResultsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private searchService: SearchService) {}
}
