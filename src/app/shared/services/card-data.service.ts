import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {

  constructor(private http:HttpClient) { }

  getMonitoringData() {
    return this.http.get<any>('/api/data/overview/monitoring').map(res => {
      return res;
    });
  }
}
