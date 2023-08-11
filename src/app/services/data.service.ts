import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public dummyDataUrl = '../assets/dummy.json';

  constructor(public http: HttpClient) {}

  getDummyData(): Observable<any> {
    return this.http.get(this.dummyDataUrl);
  }
}
