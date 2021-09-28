import { Action, createReducer, on } from '@ngrx/store';
import * as GroupSearchActions from './groupsearch.actions';
import { GroupSearchEffects } from './groupsearch.effects';

export interface GroupSearchState {
  testValue: number;
}

export const initialState: GroupSearchState = {
  testValue: 0
};


const groupSearchReducer = createReducer(
  initialState,
  on(GroupSearchActions.testAction, state => ({ testValue: state.testValue + 1 })),
 
  // on(HeroActions.deleteHeroError, (state, { error }) => ({
  //   ...state,
  //   heroes: [...state.heroes, error.requestData],
  //   loading: false
  // })),
  
);

export function reducer(state: GroupSearchState | undefined, action: Action) {
  return groupSearchReducer(state, action);
}