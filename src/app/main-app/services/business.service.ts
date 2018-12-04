import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Business } from '../models/business.model';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor(private http:HttpClient) { }

  getBusinessData() {
    return this.http.get<any>('https://localhost/api/business').map(res => {
      return res;
    });
  }

  updateData(data) {
    return this.http.post<any>('https://localhost/api/business', data).map(res => {
      return res;
    });
  }

  // insertArea(data) {
  //   return this.http.post<any>('https://localhost/api/business/area', data).map(res => {
  //     return res;
  //   });
  // }

}
