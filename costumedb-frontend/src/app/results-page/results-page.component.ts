import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AppState } from 'src/state/appState';
import { CostumeResponseObject } from '../models/costume-response.model';

@Component({
  selector: 'app-results-page',
  templateUrl: './results-page.component.html',
  styleUrls: ['./results-page.component.scss']
})
export class ResultsPageComponent implements OnInit {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  results$: Observable<CostumeResponseObject[]>;
  error$: Observable<string | null>;
  searchText$: Observable<string>

  constructor(private store: Store<AppState>, private router: Router) {
    this.loading$ = this.store.select(state => state.textSearch.loading);
    this.loaded$ = this.store.select(state => state.textSearch.loaded);
    this.results$ = this.store.select(state => state.textSearch.results);
    this.error$ = this.store.select(state => state.textSearch.error);
    this.searchText$ = this.store.select(state => state.textSearch.searchText);

    combineLatest([this.loading$, this.loaded$]).pipe(
      first(),
      tap(([loading, loaded]) => {
        if (!loading && !loaded) {
          this.router.navigate(['/']);
        }
      })
    ).subscribe();
  }


  ngOnInit(): void {
  }

}
