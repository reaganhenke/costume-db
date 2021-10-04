import { createAction, props } from '@ngrx/store';
import { CostumeResponseObject } from 'src/app/models/costume-response.model';

export const loadTextSearch = createAction(
  '[Text Search] Load Text Search',
  props<{request: string}>()
);

export const loadTextSearchSuccess = createAction(
  '[Text Search] Load Text Search Success',
  props<{response: CostumeResponseObject[]}>()
);

export const loadTextSearchError = createAction(
  '[Text Search] Load Text Search Error',
  props<{error: any}>()
);
