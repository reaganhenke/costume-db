import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as TextSearchActions from './text-search.actions';

@Injectable()
export class TextSearchEffects {
  loadGroupCostumes$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TextSearchActions.loadTextSearch),
        tap((action) => {
          console.log('placeholder, search the database for the search term');
          this.router.navigate(['results'])
        })
      ),
    { dispatch: false }
  );
  constructor(private actions$: Actions, private router: Router) {}
}
