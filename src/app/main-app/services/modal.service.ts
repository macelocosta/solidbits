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
  
  isModalOpen(): Observable<any> {
    return this.isOpen.asObservable();
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
}
