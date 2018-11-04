import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstanceIdHelperService {

  constructor() { }

  // TODO: check if generated id is already in list
  private generated_ids = [];

  getRandomId(length:Number) {
    let result = "";
    let possible = "abcdefghijklmnopqrstuvwxyz";
  
    for (let i = 0; i < length; i++) {
      result += possible.charAt(Math.floor(Math.random() * possible.length));
      if (i > 0) {
        possible += "0123456789";
      }
    }
    
    return result;
  }
}