import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http:HttpClient) { }

  preAddBin(data) {
    return this.http.post<any>('https://localhost/api/node/pre-add-bin', data).map(res => {
      return res;
    });
  }
}
