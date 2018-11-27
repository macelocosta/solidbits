import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OptionSelectorService } from './option-selector.service';
import { CardData } from 'src/app/main-app/models/card-data';

@Injectable({
  providedIn: 'root'
})
export class CardDataService {
  
  constructor(private http:HttpClient,
              private optionSelectorSvc:OptionSelectorService) { }
  
  private binsByFillLevel:CardData = {
    keys: {
      x: 'x-axis',
      value: ['below20', 'between20_50', 'between50_70', 'between70_90', 'above90']
    },
    names: { 'below20': 'Até 20%', 'between20_50': '20% - 50%', 'between50_70': '50% - 70%', 'between70_90': '70% - 90%', 'above90': 'Mais de 90%'
    },
    groups: [['below20', 'between20_50', 'between50_70', 'between70_90', 'above90']],
    json: []
  };
  
  getMonitoringData() {
    let time = this.optionSelectorSvc.getTime();
    let interval = this.optionSelectorSvc.getInterval();
    return this.http.get<any>('/api/data/overview/monitoring', { params: { time: time, interval: interval }}).map(res => {
      return res;
    });
  }

  getCurrentWeight() {
    return this.http.get<any>('/api/data/overview/current-weight').map(res => {
      return res;
    });
  }

  getCurrentVolume() {
    return this.http.get<any>('/api/data/overview/current-volume').map(res => {
      res.units = 'l';
      return res;
    });
  }

  getBinsByFillLevel() {
    return this.http.get<any>('/api/data/overview/bins-by-fill-level').map(res => {
      res.data['x-axis'] = 0;
      this.binsByFillLevel.json.push(res.data);
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
      <span>Não há dados para serem exibidos.</span>
    `
  }
}
