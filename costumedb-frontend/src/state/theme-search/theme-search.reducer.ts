import { Action, createReducer, on } from '@ngrx/store';
import { CostumeResponseObject } from 'src/app/models/costume-response.model';
import * as ThemeSearchActions from './theme-search.actions';

export interface ThemeSearchState {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  results: CostumeResponseObject[];
}

export const initialState: ThemeSearchState = {
  loading: false,
  loaded: false,
  error: null,
  results: []
};

const themeSearchReducer = createReducer(
  initialState,
  on(ThemeSearchActions.loadThemeSearch, state => ({
    ...state,
    loading: true,
    loaded: false,
    results: []
  })),
  on(ThemeSearchActions.loadThemeSearchSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    loaded: true,
    results: response
  })),
  on(ThemeSearchActions.loadThemeSearchError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: error
  }))
);

export function reducer(state: ThemeSearchState | undefined, action: Action) {
  return themeSearchReducer(state, action);
}