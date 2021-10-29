import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CostumeResponseObject, GitRowsCostumeResponseObject } from './models/costume-response.model';
import { CostumeRequestObject } from './models/costume-request.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiURL = "https://api.gitrows.com/@github/reaganhenke/costume-db-backend/costumes.json"

  constructor(private http: HttpClient) {}

  loadGroupCostumes(request: CostumeRequestObject[]): Observable<CostumeResponseObject[]> {
    return this.http.get<GitRowsCostumeResponseObject[]>(this.apiURL + "?size=" + request.length).pipe(
      map(costumes => {
        let sortedReq = [...request];
        sortedReq.sort((a,b) => {
          let aScore = (!!a.gender ? 1 : 0) + (!!a.hair ? 1 : 0) + (!!a.glasses ? 1 : 0) + (!!a.pet ? 1 : 0);
          let bScore = (!!b.gender ? 1 : 0) + (!!b.hair ? 1 : 0) + (!!b.glasses ? 1 : 0) + (!!b.pet ? 1 : 0);
          return bScore - aScore;
        });

        return costumes.filter((costume) => {
          sortedReq.forEach(costumeReq => {
            let foundIndex = (costume.characters).findIndex((cos => {  
              return (!costumeReq.gender || (costumeReq.gender === cos.gender) || (cos.gender === "any")) &&
              (!costumeReq.hair || (costumeReq.hair === cos.hair) || (cos.hair === "any")) &&
              (costumeReq.glasses ? cos.glasses : true) &&
              (costumeReq.pet ? cos.pet : true);
            }));

            if (foundIndex >= 0) {
              costume.characters.splice(foundIndex, 1);
            }
          })
          return !costume.characters.length;
        })
      })
    );
  }

  loadCostumesByTheme(request: string): Observable<GitRowsCostumeResponseObject[]> {
    return this.http.get<GitRowsCostumeResponseObject[]>(this.apiURL).pipe(
      map(costumes => {
        return costumes.filter((costume) => {
          return costume.theme.includes(request);
        })
      })
    );
  }

  loadCostumesByText(request: string): Observable<GitRowsCostumeResponseObject[]> {
    return this.http.get<GitRowsCostumeResponseObject[]>(this.apiURL).pipe(
      map(costumes => {
        return costumes.filter((costume) => {
          return costume.name.toLowerCase().includes(request) || (costume.origin && costume.origin?.toLowerCase().includes(request));
        })
      })
    );
  }
}