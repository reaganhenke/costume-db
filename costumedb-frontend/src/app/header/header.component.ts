import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  search = new FormControl('');
  mobileMenu = false;
  expandThemes = false;

  constructor() { }

  ngOnInit(): void {}

  submitSearch() {
    console.log(this.search.value);
  }

  toggleMobileMenu() {
    this.mobileMenu = !this.mobileMenu;
  }

  toggleTheme() {
    this.expandThemes = !this.expandThemes;
  }
}
