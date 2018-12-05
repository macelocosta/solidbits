import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OptionSelectorService } from './option-selector.service';
import { CardData } from 'src/app/main-app/models/card-data';
import { Observer } from 'rxjs/Observer';
import { Observable } from 'rxjs/Observable';
import * as socketIo from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {
  
  constructor(private http:HttpClient,
              private optionSelectorSvc:OptionSelectorService) {
                this.socket = socketIo.connect((this.SERVER_URL));
                this.socket.emit('get-now');
              }

  private socket;
  private SERVER_URL = "https://localhost";
  
  private binsByFillLevel_meta:CardData = {
    keys: {
      x: 'x-axis',
      value: ['below20', 'between20_50', 'between50_70', 'between70_90', 'above90']
    },
    names: { 'below20': 'Até 20%', 'between20_50': '20% - 50%', 'between50_70': '50% - 70%', 'between70_90': '70% - 90%', 'above90': 'Mais de 90%'
    },
    groups: [['below20', 'between20_50', 'between50_70', 'between70_90', 'above90']],
    json: []
  };

  currentWeight(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('overview-current-weight', (data) => observer.next(data));
    });
  }

  currentVolume(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('overview-current-volume', (data) => observer.next(data));
    });
  }

  currentUsage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('overview-current-usage', (data) => observer.next(data));
    });
  }

  mapData(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('map-data', (data) => observer.next(data));
    });
  }

  emitMonitoringData() {
    let time = this.optionSelectorSvc.getTime();
    let interval = this.optionSelectorSvc.getInterval();
    this.socket.emit('overview-monitoring', { time: time, interval: interval});
  }

  monitoringData():Observable<any> {    
    return new Observable<any>(observer => {
      this.socket.on('overview-monitoring', (data) => {
        observer.next(data);
      });
    });
  }

  binsByFillLevel(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('bins-by-fill-level', (data) => {
        data.response['x-axis'] = 0;
        this.binsByFillLevel_meta.json = [];
        this.binsByFillLevel_meta.json.push(data.response);
        observer.next(this.binsByFillLevel_meta);
      });
    });
  }

  network():  Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('network', (data) => {
        observer.next(data);
      });
    });
  }

//   json: [
//     {place: 'Interblocos', value: 76.90},
//     {place: 'Área de Convivência', value: 65.87},
//     {place: 'Sala 1 Bloco 1', value: 50.34},
//     {place: 'Laboratório 3', value: 43.09},
//     {place: 'Sala de Design', value: 39.00}
//   ],
//   keys: {x: 'place', value: ['value']},
//   names: {place: 'Lugar', value: 'Porcentagem ocupada'}

  filledBinsPerArea(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('filled-bins-per-area', (data) => {
        let data_ = {};
        data_['json'] = [];
        data_['json'].push(data);
        data_['keys'] = {x: 'place', value: ['value']},
        observer.next(data_);
      });
    })
  }

  biggestWasteProducers(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('biggest-waste-producers', (data) => {
        let data_ = {};
        data_['json'] = [];
        data_['json'].push(data);
        data_['keys'] = {x: 'place', value: ['value']},
        data_['names'] = {place: 'Lugar', value: 'Produção'}
        console.log(data_);
        observer.next(data_);
      });
    })
  }
  
  getMonitoringData() {
    let time = this.optionSelectorSvc.getTime();
    let interval = this.optionSelectorSvc.getInterval();
    return this.http.get<any>('https://localhost/api/data/overview/monitoring', { params: { time: time, interval: interval }}).map(res => {
      return res;
    });
  }

  getCurrentWeight() {
    return this.http.get<any>('https://localhost/api/data/overview/current-weight').map(res => {
      return res;
    });
  }

  getCurrentVolume() {
    return this.http.get<any>('https://localhost/api/data/overview/current-volume').map(res => {
      res.units = 'l';
      return res;
    });
  }

  getBinsByFillLevel() {
    return this.http.get<any>('https://localhost/api/data/overview/bins-by-fill-level').map(res => {
      res.data['x-axis'] = 0;
      this.binsByFillLevel_meta.json.push(res.data);
      return this.binsByFillLevel;
    });
  }

  getLoadErrorHtmlContent():string {
    return `
      <i class="icon-warning"></i>
      <span>Ocorreu um erro enquanto tentamos recuperar o conteúdo.</span>
      <button type="submit" class="is-info is-md" [class.is-loading]="isReloading">
        <span>Tentar novamente</span>
        <span class="is-loading-text">Tentando novamente...</span>
      </button>
    `
  }

  getNoDataHtmlContent():string {
    return `
      <span class="no-data">Não há dados para serem exibidos.</span>
    `
  }

  getFloors() {
    return this.http.get<any>('https://localhost/api/data/floor-urls').map(res => {
      return res;
    });
  }
}
