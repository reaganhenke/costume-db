import { createAction, props } from '@ngrx/store';
import { CostumeResponseObject } from 'src/app/models/costume-response.model';

export const loadThemeSearch = createAction(
  '[Theme Search] Load Theme Search',
  props<{request: string}>()
);

export const loadThemeSearchSuccess = createAction(
  '[Theme Search] Load Theme Search Success',
  props<{response: CostumeResponseObject[]}>()
);

export const loadThemeSearchError = createAction(
  '[Theme Search] Load Theme Search Error',
  props<{error: any}>()
);
