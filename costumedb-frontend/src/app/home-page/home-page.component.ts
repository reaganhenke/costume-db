import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { testAction } from 'src/state/groupsearch.actions';
import { GroupSearchState } from 'src/state/groupsearch.reducer';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private store: Store<GroupSearchState>) { }

  ngOnInit(): void {
  }

  test() {
    console.log('testing store');
    this.store.dispatch(testAction())
  }

}
