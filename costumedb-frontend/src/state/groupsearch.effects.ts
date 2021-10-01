import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { GroupSearchService } from 'src/app/group-search/group-search.service';
import * as GroupSearchActions from './groupsearch.actions';

@Injectable()
export class GroupSearchEffects {

  loadGroupCostumes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GroupSearchActions.loadGroupCostumes),
      switchMap((action) =>
        this.groupSearchService.loadGroupCostumes(action.request).pipe(
          map(response => GroupSearchActions.loadGroupCostumesSuccess({response})),
          catchError(error => of(GroupSearchActions.loadGroupCostumesError({error})))
        )
      )
      )
  );
  constructor(private actions$: Actions, private groupSearchService: GroupSearchService) {}
}