import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/state/appState';
import { clearGroupCostumesSearch, loadGroupCostumes } from 'src/state/groupsearch.actions';
import { CostumeResponse } from '../models/costume-response.model';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.scss']
})
export class GroupSearchComponent implements OnDestroy {
  groupSize = 0;
  groupSizeForm = new FormControl('', [Validators.required, Validators.pattern(/[0-9]/), Validators.maxLength(1)]);
  group: FormGroup [] = [];

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  results$: Observable<CostumeResponse>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {
    this.loading$ = this.store.select(state => state.groupSearch.loading);
    this.loaded$ = this.store.select(state => state.groupSearch.loaded);
    this.results$ = this.store.select(state => state.groupSearch.results);
    this.error$ = this.store.select(state => state.groupSearch.error);
  }

  next() {
    if (this.groupSizeForm.valid){
      this.groupSize = this.groupSizeForm.value;
      for (let i = 0; i < this.groupSize; i++) {
        this.group.push(this.getNewFormGroup());
      }
    }
  }

  getNewFormGroup() {
    return new FormGroup({
      'gender': new FormControl('any'),
      'hair': new FormControl('any')
    });
  }

  addCostume() {
    this.group.push(this.getNewFormGroup());
  }

  removeCostume(i: number) {
    this.group.splice(i, 1);
  }

  submit() {
    let values: String[] = [];
    this.group.forEach(costume => {
      values.push(costume.value)
    });
    this.store.dispatch(loadGroupCostumes(values));
  }

  retry() {
    this.groupSize = 0;
    this.store.dispatch(clearGroupCostumesSearch());
  }

  ngOnDestroy(): void {
    this.retry();
  }
}
