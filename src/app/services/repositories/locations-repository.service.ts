import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationsRepositoryService {
  private readonly http = inject(HttpClient);

  locations:  Observable<string[]> = this.http.get<string[]>('/api/v1/data/locations');

}
