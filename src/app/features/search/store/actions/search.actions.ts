import {createAction, props} from '@ngrx/store';

import {IComment} from '../../interfaces/model-types.interface';

export const loadResults = createAction(
  '[Search] Load Results',
  props<{
    query: string,
    page: number,
    limit: number,
    addToExisting: boolean
  }>()
);

export const loadResultsSuccess = createAction(
  '[Search] Load Results Success',
  props<{ results: IComment[], query: string, addToExisting: boolean }>()
);

export const loadResultsFailure = createAction(
  '[Search] Load Results Failure',
  props<{ error: string | null }>()
);
