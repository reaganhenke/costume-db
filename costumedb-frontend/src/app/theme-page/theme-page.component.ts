import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/state/appState';
import { loadThemeSearch } from 'src/state/theme-search/theme-search.actions';
import { CostumeResponseObject } from '../models/costume-response.model';
import { themes } from '../themes';

@Component({
  selector: 'app-theme-page',
  templateUrl: './theme-page.component.html',
  styleUrls: ['./theme-page.component.scss']
})
export class ThemePageComponent {
  theme: string|null = null;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  results$: Observable<CostumeResponseObject[]>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private router: Router) {
    this.loading$ = this.store.select(state => state.themeSearch.loading);
    this.loaded$ = this.store.select(state => state.themeSearch.loaded);
    this.results$ = this.store.select(state => state.themeSearch.results);
    this.error$ = this.store.select(state => state.themeSearch.error);
    this.route.paramMap.subscribe((params: ParamMap)=> {  
      this.theme = params.get('theme');
      if (this.theme && this.inList(this.theme)) {
        this.store.dispatch(loadThemeSearch({request: this.theme}));
      } else {
        this.router.navigate(['']);
      }
    });
  }

  inList(input: string) {
    return themes.filter(x => x[1] === input).length;
  }
}
