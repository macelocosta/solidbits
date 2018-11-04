import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import * as c3 from 'c3';
import { CardStackedBarHorizontal } from '../../models/card-stacked-bar-horizontal';

@Component({
  selector: 'app-card-stacked-bar-horizontal',
  templateUrl: './card-stacked-bar-horizontal.component.html',
  styleUrls: ['./card-stacked-bar-horizontal.component.scss']
})
export class CardStackedBarHorizontalComponent implements OnInit, AfterViewInit, OnChanges {

  constructor() { }

  @Input() title:string;
  @Input() help_text:string;
  @Input() data = [];
  
  private parsed_data = {
    json: [

    ]
  }
  private chart;

  ngOnInit() {
    
  }
  
  ngAfterViewInit() {
    this.chart = c3.generate({
      bindto: '.stacked-horizontal-bar',
      size: {
        height: 128
      },
      data: {
        x: 'x-axis',
        json: this.data,
        keys: {
          x: 'x-axis',
          value: ['below20', 'between20_50', 'between50_70', 'between70_90', 'above90']
        },
        names: {
          'below20': 'Até 20%',
          'between20_50': '20% - 50%',
          'between50_70': '50% - 70%',
          'between70_90': '70% - 90%',
          'above90': 'Mais de 90%'
        },
        groups: [
          ['below20', 'between20_50', 'between50_70', 'between70_90', 'above90']
        ],
        type: 'bar',
        order: 'null'
      },
      // color: {
      //   pattern: ['#00F37A', '#A7FF34', '#FFFF00', '#FFC31E', '#F35E37']
      // },
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
    if (this.data.length > 0) {
      this.data[0]['x-axis'] = 0;
      this.parsed_data.json = this.data;
      this.chart.unload(this.data);
      this.chart.load(this.parsed_data);
      console.log(this.parsed_data.json);
    }
  }
}
