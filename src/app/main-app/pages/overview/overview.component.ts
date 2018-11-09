import { Component, OnInit } from '@angular/core';
import { CardBasicInfo } from '../../models/card-basic-info';
import { CardChartData } from '../../models/card-chart-data';
import { CardDataService } from 'src/app/shared/services/card-data.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor(private cardDataSvc:CardDataService) { }

  private depositedWeight = new CardBasicInfo();
  private depositedVolume = new CardBasicInfo();
  private binsByFillLevel = [];
  private biggestWasteProducers:CardChartData;
  private filledBinsPerArea:CardChartData;
  private volumeTotalDepositedCollected:CardChartData;
  private monitoringData;
  
  ngOnInit() {
    this.monitoringData = this.cardDataSvc.getMonitoringData().subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    )


    setTimeout(() => {
      this.depositedWeight.value = 2.31;
      this.depositedWeight.units = 'kg';
      this.depositedWeight.growth = 'down';
      this.depositedWeight.info = '-5%';
      
      this.binsByFillLevel = [{'below20': 6, 'between20_50': 7, 'between50_70': 2, 'between70_90': 3, 'above90': 1}];
    }, 3000);
    setTimeout(() => {
      this.depositedVolume.value = 0.23;
      this.depositedVolume.units = 'l';
      this.depositedVolume.growth = 'down';
      this.depositedVolume.info = '-2%';

      this.volumeTotalDepositedCollected = {
        json: [
          {date: '2018-09-08', deposited: 2.22, collected: 1.96},
          {date: '2018-09-07', deposited: 1.75, collected: 1.98},
          {date: '2018-09-06', deposited: 1.90, collected: 2.09},
          {date: '2018-09-05', deposited: 1.67, collected: 1.88},
          {date: '2018-09-04', deposited: 0.05, collected: 0.18},
          {date: '2018-09-03', deposited: 0.08, collected: 0.06},
          {date: '2018-09-02', deposited: 2.54, collected: 1.43}
        ],
        keys: {x: 'date', value: ['deposited', 'collected']},
        names: {deposited: 'Depositado', collected: 'Coletado'},
        xFormat: '%Y-%m-%d'
      };
    }, 3500);
    setTimeout(() => {
      this.binsByFillLevel = [{'below20': 7, 'between20_50': 2, 'between50_70': 6, 'between70_90': 1, 'above90': 3}];
      this.volumeTotalDepositedCollected.json = [
        {date: '2018-09-08', deposited: 1.32, collected: 1.46},
        {date: '2018-09-07', deposited: 1.75, collected: 1.98},
        {date: '2018-09-06', deposited: 1.60, collected: 1.09},
        {date: '2018-09-05', deposited: 1.67, collected: 1.21},
        {date: '2018-09-04', deposited: 1.05, collected: 0.18},
        {date: '2018-09-03', deposited: 0.08, collected: 1.06},
        {date: '2018-09-02', deposited: 1.23, collected: 1.13}
      ];
      //update entire object so onChanges detects its changes
      this.volumeTotalDepositedCollected = Object.assign({}, this.volumeTotalDepositedCollected);
    }, 6000);
    setTimeout(() => {
      this.binsByFillLevel = [{'below20': 4, 'between20_50': 1, 'between50_70': 3, 'between70_90': 5, 'above90': 2}];

      this.volumeTotalDepositedCollected.json = [
        {date: '2018-09-08', deposited: 0.32, collected: 0.46},
        {date: '2018-09-07', deposited: 0.75, collected: 0.98},
        {date: '2018-09-06', deposited: 0.60, collected: 0.09},
        {date: '2018-09-05', deposited: 0.67, collected: 0.21},
        {date: '2018-09-04', deposited: 0.05, collected: 0.18},
        {date: '2018-09-03', deposited: 0.08, collected: 0.06},
        {date: '2018-09-02', deposited: 0.23, collected: 0.13}
      ];
      //update entire object so onChanges detects its changes
      this.volumeTotalDepositedCollected = Object.assign({}, this.volumeTotalDepositedCollected);
    }, 9000);
    setTimeout(() => {
      this.biggestWasteProducers = {
        json: [
          {place: 'Biblioteca', value: 32.45},
          {place: 'Área de Convivência', value: 78.21},
          {place: 'Sala de Design', value: 24.98},
          {place: 'Secretaria Acadêmica', value: 22.12},
          {place: 'Sala multiuso', value: 26.56},
        ],
        keys: {x: 'place', value: ['value']},
        names: {place: 'Lugar', value: 'Volume coletado'}
      }
      this.filledBinsPerArea = {
        json: [
          {place: 'Interblocos', value: 76.90},
          {place: 'Área de Convivência', value: 65.87},
          {place: 'Sala 1 Bloco 1', value: 50.34},
          {place: 'Laboratório 3', value: 43.09},
          {place: 'Sala de Design', value: 39.00}
        ],
        keys: {x: 'place', value: ['value']},
        names: {place: 'Lugar', value: 'Porcentagem ocupada'}
      };
    }, 2000);
    setTimeout(() => {
      this.biggestWasteProducers.json = [
        {'place': 'Biblioteca', 'value': 21.90},
        {'place': 'Área de Convivência', 'value': 29.09},
        {'place': 'Sala de design', 'value': 18.76},
        {'place': 'Secretaria Acadêmica', 'value': 17.09},
        {'place': 'Sala multiuso', 'value': 20.00},
      ];
      this.biggestWasteProducers = Object.assign({}, this.biggestWasteProducers);
    }, 4000);
  }
}
