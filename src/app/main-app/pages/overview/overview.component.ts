import { Component, OnInit } from '@angular/core';
import { CardBasicInfo } from '../../models/card-basic-info';
import { CardStackedBarHorizontal } from '../../models/card-stacked-bar-horizontal';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  constructor() { }

  private depositedWeight = new CardBasicInfo();
  private depositedVolume = new CardBasicInfo();
  private binsByFillLevel = [];
  
  ngOnInit() {
    setTimeout(() => {
      this.depositedWeight.value = 2.31;
      this.depositedWeight.units = 'kg';
      this.depositedWeight.growth = 'down';
      this.depositedWeight.info = '-5%';
      
      this.binsByFillLevel = [{'below20': 6, 'between20_50': 7, 'between50_70': 2, 'between70_90': 3, 'above90': 1}];
    }, 2000);
    setTimeout(() => {
      this.depositedVolume.value = 0.23;
      this.depositedVolume.units = 'l';
      this.depositedVolume.growth = 'down';
      this.depositedVolume.info = '-2%';
    }, 2500);
    setTimeout(() => {
      this.binsByFillLevel = [{'below20': 7, 'between20_50': 2, 'between50_70': 6, 'between70_90': 1, 'above90': 3}];
    }, 5000);
  }
}
