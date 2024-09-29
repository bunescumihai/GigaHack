import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartsRepositoryService {
  private http = inject(HttpClient);

  constructor() { }

  costs(location: string): Observable<any> {
    return this.http.get<any>(`/api/v1/data/costs-per-payment-type-per-agency?location=${location}`)
  }
}
