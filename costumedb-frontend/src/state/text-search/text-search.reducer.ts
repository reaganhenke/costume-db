import { Action, createReducer, on } from '@ngrx/store';
import { CostumeResponseObject } from 'src/app/models/costume-response.model';
import * as TextSearchActions from './text-search.actions';

export interface TextSearchState {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  results: CostumeResponseObject[];}

export const initialState: TextSearchState = {
  loading: false,
  loaded: false,
  error: null,
  results: []};

const textSearchReducer = createReducer(
  initialState,
  on(TextSearchActions.loadTextSearch, state => ({
    ...state,
    loading: true,
    loaded: false,
    results: []
  })),
  on(TextSearchActions.loadTextSearchSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    loaded: true,
    results: response
  })),
  on(TextSearchActions.loadTextSearchError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: error
  }))
);

export function reducer(state: TextSearchState | undefined, action: Action) {
  return textSearchReducer(state, action);
}
