import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/state/appState';
import { loadTextSearch } from 'src/state/text-search/text-search.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  search = new FormControl('');
  mobileMenu = false;
  expandThemes = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {}

  submitSearch() {
    let value = (this.search.value).replace(/[^A-Za-z ]/g, '');
    this.store.dispatch(loadTextSearch({request: value}));
  }

  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  toggleTheme() {
    this.expandThemes = !this.expandThemes;
  }
}
