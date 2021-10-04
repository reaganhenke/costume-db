import { createAction, props } from '@ngrx/store';
import { CostumeResponseObject } from 'src/app/models/costume-response.model';

export const loadGroupCostumes = createAction(
  '[Group Search] Load Group Costumes',
  (request: any) => request
);

export const loadGroupCostumesSuccess = createAction(
  '[Group Search] Load Group Costumes Success',
  props<{response: CostumeResponseObject[]}>()
);

export const loadGroupCostumesError = createAction(
  '[Group Search] Load Group Costumes Error',
  props<{error: any}>()
);

export const clearGroupCostumesSearch = createAction('[Group Search] Clear Group Costume Search');
