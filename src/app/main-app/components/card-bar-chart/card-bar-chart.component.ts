import { Component, OnInit, Input, OnChanges, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';
import { InstanceIdHelperService } from '../../services/instance-id-helper.service';
import { CardData } from '../../models/card-data';

@Component({
  selector: 'app-card-bar-chart',
  templateUrl: './card-bar-chart.component.html',
  styleUrls: ['./card-bar-chart.component.scss']
})
export class CardBarChartComponent implements OnInit, AfterViewInit, OnChanges {

  constructor(private instanceIdHelperSvc:InstanceIdHelperService) { }

  @Input() title:string;
  @Input() help_text:string;
  @Input() data:CardData;

  private instance_id = this.instanceIdHelperSvc.getRandomId(6);
  private chart;

  ngOnInit() {
  }
  
  ngAfterViewInit() {
    this.chart = c3.generate({
      bindto: `.bar-chart.${this.instance_id}`,
      data: {
        json: [],
        type: 'bar'
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%d'
          },
        }
      },
      color: {
        pattern: ['#3556DE', '#183195']
      },
      // padding: {
      //   top: 0,
      //   right: 0,
      //   bottom: 0,
      //   left: 20
      // },
    });
  }

  ngOnChanges() {
    if (this.data) {
      this.data.type = 'bar';
      this.chart.load({
        json: this.data.json,
        names: this.data.names,
        keys: this.data.keys,
        xFormat: this.data.xFormat
      });
    }
  }
}
