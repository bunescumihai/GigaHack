import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AgencyRepositoryService {

  private http = inject(HttpClient);
  constructor() { }

  agencies$: Observable<Array<string>> = this.http.get<Array<string>>('/api/v1/data/agencies');

}
