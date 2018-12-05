import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor() {}

  public is_open = false;
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private data = {
    type: null
  }
  private hasAdded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private addAreaReturnData: any;
  private addBinReturnData: any;
  private areaReturnData: BehaviorSubject<object> = new BehaviorSubject(null);
  private binReturnData: BehaviorSubject<object> = new BehaviorSubject(null);
  
  isModalOpen(): Observable<any> {
    return this.isOpen.asObservable();
  }

  setAddAreaReturnData(data) {
    this.addAreaReturnData = data;
    this.areaReturnData.next(this.addAreaReturnData);
  }

  setAddBinReturnData(name, coordinates, id) {
    this.addBinReturnData = { name: name, coordinates: coordinates, _id: id } ;
    this.binReturnData.next(this.addBinReturnData);
  }

  getData(): any {
    return this.data;
  }

  open(type: any):void {
    this.data.type = type;
    this.is_open = true;
    this.isOpen.next(this.is_open);
  }
  
  close():void {
    this.is_open = false;
    this.isOpen.next(this.is_open);
  }

  updateHasAdded(hasAdded) {
    this.hasAdded.next(hasAdded);
  }

  getHasAdded(): Observable<any> {
    return this.hasAdded.asObservable();
  }

  getAreaReturnData(): Observable<any> {
    return this.areaReturnData.asObservable();
  }

  getBinReturnData(): Observable<any> {
    return this.binReturnData.asObservable();
  }
}
