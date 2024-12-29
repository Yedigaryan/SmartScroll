import { createAction, props } from '@ngrx/store';
import {IComment} from '../../interfaces/model-types.interface';

export const loadResults = createAction(
  '[Search] Load Results',
  props<{ query: string }>()
);

export const loadResultsSuccess = createAction(
  '[Search] Load Results Success',
  props<{ results: any[] }>()
);

export const loadResultsFailure = createAction(
  '[Search] Load Results Failure',
  props<{ error: any }>()
);

export const saveQuery = createAction(
  '[Search] Save Query',
  props<{ query: string }>()
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
