import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {mergeMap, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as SearchActions from '../actions/search.actions';
import {SearchService} from '../../services/search.service';
import {MockDataService} from '../../../../core/services/mock-data.service';
import {IComment} from '../../interfaces/model-types.interface';

@Injectable()
export class SearchEffects {
  loadResults$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadResults),
      switchMap(({ query }) =>
        this.searchService.search(query).pipe(
          map((results) => SearchActions.loadResultsSuccess({ results })),
          catchError((error) =>
            of(SearchActions.loadResultsFailure({ error }))
          )
        )
      )
    )
  );

  loadComments$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SearchActions.loadComments),
      mergeMap(() =>
        this.mockDataService.getComments().pipe(
          map((comments: IComment[]) =>
            SearchActions.loadCommentsSuccess({ comments })
          ),
          catchError((error) =>
            of(SearchActions.loadCommentsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(private actions$: Actions, private searchService: SearchService, private mockDataService: MockDataService) {}
}
