import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/state/appState';
import { loadTextSearch } from 'src/state/text-search/text-search.actions';
import { themes } from '../themes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  search = new FormControl('');
  mobileMenu = false;
  expandThemes = false;
  themes = themes;

  constructor(private store: Store<AppState>, private router: Router,  private cdr: ChangeDetectorRef) {
    this.router.events.subscribe(() => {
      this.mobileMenu = false;
      this.expandThemes = false;
    })
  }

  ngOnInit(): void {}

  submitSearch() {
    let value = (this.search.value).replace(/[^A-Za-z ]/g, '').toLowerCase();
    if (value && value.length > 2) {
      this.store.dispatch(loadTextSearch({request: value}));
    }
  }

  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
    this.expandThemes = false;
  }

  toggleTheme() {
    this.expandThemes = !this.expandThemes;
  }
}
