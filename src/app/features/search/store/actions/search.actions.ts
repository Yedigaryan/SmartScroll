import {createAction, props} from '@ngrx/store';
import {IComment} from '../../interfaces/model-types.interface';

export const loadResults = createAction(
  '[Search] Load Results',
  props<{
    query: string,
    page: number,
    limit: number
  }>()
);

export const loadResultsSuccess = createAction(
  '[Search] Load Results Success',
  props<{ results: IComment[] }>()
);

export const loadResultsFailure = createAction(
  '[Search] Load Results Failure',
  props<{ error: any }>()
);

export const saveSearchQuery = createAction(
  '[Search] Save Query',
  props<{ query: string, resultCount: number }>()
);

export const loadComments = createAction('[Mock Data] Load Comments');
export const loadCommentsSuccess = createAction(
  '[Mock Data] Load Comments Success',
  props<{ comments: IComment[] }>()
);
export const loadCommentsFailure = createAction(
  '[Mock Data] Load Comments Failure',
  props<{ error: any }>()
);
