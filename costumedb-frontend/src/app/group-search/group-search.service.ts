import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostumeResponseObject } from '../models/costume-response.model';

@Injectable()
export class GroupSearchService {
  apiURL = "https://run.mocky.io/v3/b8ea0725-16c0-47bd-bbfc-81941528e3d1"
  // apiURL = "https://run.mocky.io/v3/ef87c623-8407-416d-819d-0bf6829d3d21"; // this one is blank for testing empty response

  constructor(private http: HttpClient) {}

  loadGroupCostumes(request: any): Observable<CostumeResponseObject[]> {
    // TODO: update typing and pass search body
    return this.http.get<CostumeResponseObject[]>(this.apiURL);
  }
}