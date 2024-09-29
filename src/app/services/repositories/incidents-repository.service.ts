import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../api/api-response";

@Injectable({
  providedIn: 'root'
})
export class IncidentsRepositoryService {

  private http = inject(HttpClient);

  constructor() { }



  getInsightsByLocation(location: string): Observable<ApiResponse<string>>{
    return this.http.get<string>(`/api/v1/data/incidents?location=${location}`).pipe(
      map(data => ({
        loading: false,
        error: null,
        object: data,
      })),
      startWith({
        loading: true,
        error: null,
        object: null
      }),
      catchError(err => of({
        loading: false,
        error: err,
        object: null,
      }))
    );
  }
}
