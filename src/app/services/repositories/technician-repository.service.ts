import {inject, Injectable} from '@angular/core';
import {catchError, map, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../api/api-response";
import {TechnicianIncident} from "../../models/technician-incident";
import {HttpClient} from "@angular/common/http";

// noinspection TypeScriptValidateTypes
@Injectable({
  providedIn: 'root'
})
export class TechnicianRepositoryService {

  private http = inject(HttpClient);

  constructor() { }

  technicianIncidents$: Observable<ApiResponse<Array<TechnicianIncident>>> =
    this.http.get<Array<TechnicianIncident>>("/api/v1/data/incidents-per-technician")
      .pipe(
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
