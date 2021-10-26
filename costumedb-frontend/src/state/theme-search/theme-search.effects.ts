import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SearchService } from 'src/app/search.service';
import * as ThemeSearchActions from './theme-search.actions';

@Injectable()
export class ThemeSearchEffects {
  loadGroupCostumes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ThemeSearchActions.loadThemeSearch),
      switchMap((action) =>
        this.searchService.loadCostumesByTheme(action.request).pipe(
          map((response) =>
            ThemeSearchActions.loadThemeSearchSuccess({ response })
          ),
          catchError((error) =>
            of(ThemeSearchActions.loadThemeSearchError({ error }))
          )
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}
}
