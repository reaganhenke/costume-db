import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostumeResponse } from '../models/costume-response.model';

@Injectable()
export class GroupSearchService {
  apiURL = "https://run.mocky.io/v3/b8ea0725-16c0-47bd-bbfc-81941528e3d1"

  constructor(private http: HttpClient) {}

  loadGroupCostumes(request: any): Observable<CostumeResponse> {
    // TODO: update typing and pass search body
    return this.http.get<CostumeResponse>(this.apiURL);
  }
}