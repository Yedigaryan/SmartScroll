import {createAction, props} from "@ngrx/store";

export const queryActions = createAction(
  '[Search] Save Query',
  props<{ query: string }>()
);
