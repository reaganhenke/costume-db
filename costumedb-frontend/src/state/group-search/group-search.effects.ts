import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SearchService } from 'src/app/search.service';
import * as GroupSearchActions from './group-search.actions';

@Injectable()
export class GroupSearchEffects {
  loadGroupCostumes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupSearchActions.loadGroupCostumes),
      switchMap((action) =>
        this.searchService.loadGroupCostumes(action.request).pipe(
          map((response) =>
            GroupSearchActions.loadGroupCostumesSuccess({ response })
          ),
          catchError((error) =>
            of(GroupSearchActions.loadGroupCostumesError({ error }))
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
