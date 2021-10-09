import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { SearchService } from 'src/app/search.service';
import * as TextSearchActions from './text-search.actions';

@Injectable()
export class TextSearchEffects {
  loadGroupCostumes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TextSearchActions.loadTextSearch),
      tap(() => {
        this.router.navigate(['results']);
      }),
      switchMap((action) =>
        this.searchService.loadCostumesByText(action.request).pipe(
          map((response) =>
            TextSearchActions.loadTextSearchSuccess({ response })
          ),
          catchError((error) =>
            of(TextSearchActions.loadTextSearchError({ error }))
          )
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private router: Router,
    private searchService: SearchService
  ) {}
}
