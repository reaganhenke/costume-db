import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostumeResponseObject } from './models/costume-response.model';
import { CostumeRequestObject } from './models/costume-request.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
<<<<<<< HEAD
  // apiURL = "https://run.mocky.io/v3/4dc26555-f40e-46ba-82a4-1b733735725e"
  apiURL = "https://run.mocky.io/v3/ef87c623-8407-416d-819d-0bf6829d3d21"; // this one is blank for testing empty response
=======
  apiURL = "http://localhost:5000/groupsearch"
  // apiURL = "https://run.mocky.io/v3/ef87c623-8407-416d-819d-0bf6829d3d21"; // this one is blank for testing empty response
>>>>>>> 0dba4f0 (create endpoint for groupsearch, add flask_cors)

  constructor(private http: HttpClient) {}

  loadGroupCostumes(request: CostumeRequestObject[]): Observable<CostumeResponseObject[]> {
    // TODO: update typing and pass search body
    return this.http.post<CostumeResponseObject[]>(this.apiURL, {"query": request});
  }

  loadCostumesByText(request: string): Observable<CostumeResponseObject[]> {
    // console.log('searching database for the text: ', request);
    // TODO: update typing and pass search body
    // Determine if need separate functions for theme and text
    return this.http.get<CostumeResponseObject[]>(this.apiURL);
  }
}
