import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostumeResponseObject } from './models/costume-response.model';
import { CostumeRequestObject } from './models/costume-request.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiURL = "https://run.mocky.io/v3/b8ea0725-16c0-47bd-bbfc-81941528e3d1"
  // apiURL = "https://run.mocky.io/v3/ef87c623-8407-416d-819d-0bf6829d3d21"; // this one is blank for testing empty response

  constructor(private http: HttpClient) {}

  loadGroupCostumes(request: CostumeRequestObject[]): Observable<CostumeResponseObject[]> {
    // TODO: update typing and pass search body
    return this.http.get<CostumeResponseObject[]>(this.apiURL);
  }

  loadCostumesByText(request: string): Observable<CostumeResponseObject[]> {
    console.log('searching database for the text: ', request);
    // TODO: update typing and pass search body
    // Determine if need separate functions for theme and text
    return this.http.get<CostumeResponseObject[]>(this.apiURL);
  }
}