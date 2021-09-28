import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import * as GroupSearchActions from './groupsearch.actions';

@Injectable()
export class GroupSearchEffects {

  test$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupSearchActions.testAction),
      tap(() =>
        console.log('just checking that side effects work')
        // switchMap
        // this.villainDataService.getVillains().pipe(
        //   map(villains => VillainActions.getVillainsSuccess({ villains })),
        //   catchError(error => of(VillainActions.getVillainsError({ error })))
        // )
      )
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions) {}
}