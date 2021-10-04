import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/state/appState';
import { clearGroupCostumesSearch, loadGroupCostumes } from 'src/state/groupsearch.actions';
import { CostumeResponseObject } from '../models/costume-response.model';

@Component({
  selector: 'app-group-search',
  templateUrl: './group-search.component.html',
  styleUrls: ['./group-search.component.scss']
})
export class GroupSearchComponent implements OnDestroy {
  groupSize = 0;
  groupSizeForm = new FormControl('', [Validators.required, Validators.max(9), Validators.min(1)]);
  group: FormGroup [] = [];
  removing = false;

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  results$: Observable<CostumeResponseObject[]>;
  error$: Observable<string | null>;

  constructor(private store: Store<AppState>, private fb: FormBuilder) {
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
    return this.fb.group({
      showAdvanced: new FormControl(false),
      gender: new FormControl(''),
      hair: new FormControl(''),
      bodyType: new FormControl(''),
      ethnicity: new FormControl('')
    });
  }

  addCostume() {
    this.group.push(this.getNewFormGroup());
    this.groupSize++;
  }

  removeCostume(i: number) {
    if (!this.removing){
      this.removing = true;

      let domElement = document.getElementById("costume-" + i);
      let flag = true;
      domElement?.addEventListener("transitionend", () => {
        if (flag) {
          this.group.splice(i, 1);
          this.groupSize--;
        }
        flag = false;
        this.removing = false;
      })
      domElement?.classList.add('remove');
    }
  }

  submit() {
    let values: String[] = [];
    this.group.forEach(costume => {
      costume.removeControl('showAdvanced');
      values.push(costume.value)
    });
    this.store.dispatch(loadGroupCostumes(values));
  }

  reset() {
    for(let costumeForm of this.group) {
      costumeForm.reset({
        'showAdvanced': false,
        'gender': '',
        'hair': '',
        'bodyType': '',
        'ethnicity': ''
      });
    }
  }

  retry() {
    this.groupSize = 0;
    this.group = [];
    this.store.dispatch(clearGroupCostumesSearch());
  }

  ngOnDestroy(): void {
    this.retry();
  }
}
