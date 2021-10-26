import { Action, createReducer, on } from '@ngrx/store';
import { CostumeResponseObject, GitRowsCostumeResponseObject } from 'src/app/models/costume-response.model';
import * as ThemeSearchActions from './theme-search.actions';

export interface ThemeSearchState {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  theme: string;
  results: Map<string, GitRowsCostumeResponseObject[]>;
}

export const initialState: ThemeSearchState = {
  loading: false,
  loaded: false,
  error: null,
  theme: '',
  results: new Map()
};

const themeSearchReducer = createReducer(
  initialState,
  on(ThemeSearchActions.loadThemeSearch, (state, { request }) => (
    {
    ...state,
    loading: true,
    loaded: false,
    error: null,
    theme: request
  })),
  on(ThemeSearchActions.loadThemeSearchSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    loaded: true,
    results: new Map([...Array.from(state.results.entries()), [state.theme, response]])
  })),
  on(ThemeSearchActions.loadThemeSearchError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: error,
    theme: ''
  }))
);

export function reducer(state: ThemeSearchState | undefined, action: Action) {
  return themeSearchReducer(state, action);
}