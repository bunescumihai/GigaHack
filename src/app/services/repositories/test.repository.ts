import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../api/api-response";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TestRepository {
  private httpClient = inject(HttpClient);

  getTestData(): Observable<ApiResponse<any>> {
    return this.httpClient.get("/api/v1/data/locations").pipe(
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
