import {Injectable, signal} from '@angular/core';
import {Subject, switchMap, of, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor() {
  }

  location$ = signal<string>('')


  getDataByLocation(location: string){

  }


}
