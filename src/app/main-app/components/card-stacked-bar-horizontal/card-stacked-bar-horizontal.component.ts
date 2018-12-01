import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import * as c3 from 'c3';
import { CardData } from '../../models/card-data';

@Component({
  selector: 'app-card-stacked-bar-horizontal',
  templateUrl: './card-stacked-bar-horizontal.component.html',
  styleUrls: ['./card-stacked-bar-horizontal.component.scss']
})
export class CardStackedBarHorizontalComponent implements OnInit, AfterViewInit, OnChanges {

  constructor() { }

  @Input() title:string;
  @Input() help_text:string;
  @Input() data:CardData;
  
  private chart;

  ngOnInit() {
    
  }
  
  ngAfterViewInit() {
    this.chart = c3.generate({
      bindto: '.stacked-horizontal-bar',
      size: {
        height: 103
      },
      data: {
        x: 'x-axis',
        json: [],
        type: 'bar',
        order: 'null',
        groups: [['below20', 'between20_50', 'between50_70', 'between70_90', 'above90']]
      },
      zoom: {
        enabled: false
      },
      color: {
        pattern: ['#8cc34b', '#cddc39', '#ffe93b', '#fec107', '#fe9900']
      },
      bar: {
        width: {
          ratio: 0.8
        }
      },
      tooltip: {
        grouped: false,
        format: {
          title: function(v) {
            return "Lixeiras"
          },
          value: function (value) {
            return value == 1 ? value + " lixeira" : value + " lixeiras";
          }
        }
      },
      axis: {
        rotated: true,
        y: {
          tick: {
            format: function(x) { return x % 1 === 0 ? x : ''; }
          }
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 2
      },
    });
  }
  
  ngOnChanges() {
    if (this.data) {
      // this.data[0]['x-axis'] = 0;
      console.log(this.data);
      this.chart.load({
        json: this.data.json,
        keys: this.data.keys,
        names: this.data.names,
        groups: this.data.groups
      });
    };
  }
}
