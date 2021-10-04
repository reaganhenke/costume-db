import { Action, createReducer, on } from '@ngrx/store';
import { CostumeResponseObject } from 'src/app/models/costume-response.model';
import * as GroupSearchActions from './groupsearch.actions';

export interface GroupSearchState {
  loading: boolean;
  loaded: boolean;
  error: string | null;
  results: CostumeResponseObject[];
}

export const initialState: GroupSearchState = {
  loading: false,
  loaded: false,
  error: null,
  results: []
};

const groupSearchReducer = createReducer(
  initialState,
  on(GroupSearchActions.loadGroupCostumes, state => ({
    ...state,
    loading: true,
    loaded: false,
    results: []
  })),
  on(GroupSearchActions.loadGroupCostumesSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    loaded: true,
    results: response
  })),
  on(GroupSearchActions.loadGroupCostumesError, (state, { error }) => ({
    ...state,
    loading: false,
    loaded: true,
    error: error
  })),
  on(GroupSearchActions.clearGroupCostumesSearch, state => initialState)
);

export function reducer(state: GroupSearchState | undefined, action: Action) {
  return groupSearchReducer(state, action);
}