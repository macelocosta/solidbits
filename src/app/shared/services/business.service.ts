import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http:HttpClient) { }

  getBusinessData() {
    return this.http.get<any>('/api/business').map(res => {
      return res;
    });
  }

  updateData(data) {
    return this.http.post<any>('/api/business', data).map(res => {
      return res;
    });
  }

}
