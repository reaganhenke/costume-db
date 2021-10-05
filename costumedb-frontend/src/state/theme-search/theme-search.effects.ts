import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as ThemeSearchActions from './theme-search.actions';

@Injectable()
export class ThemeSearchEffects {
  loadGroupCostumes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ThemeSearchActions.loadThemeSearch),
        tap((action) =>
          console.log('placeholder, search the database for the theme')
        )
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions) {}
}
