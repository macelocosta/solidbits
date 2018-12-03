import { Component, OnInit, Input, AfterViewInit, OnChanges } from '@angular/core';
import * as c3 from 'c3';
import { CardData } from '../../models/card-data';
import { OptionSelectorService } from './../../services/option-selector.service';
import { CardDataService } from './../../services/card-data.service';

@Component({
  selector: 'app-card-area-projection',
  templateUrl: './card-area-projection.component.html',
  styleUrls: ['./card-area-projection.component.scss']
})
export class CardAreaProjectionComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() title:string;
  @Input() data:CardData;
  @Input() help_text:string;
  @Input() error_loading:boolean;

  private chart;
  private html_error;

  constructor(private optionSelectorSvc:OptionSelectorService,
              private cardDataSvc:CardDataService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chart = c3.generate({
      bindto: '.historic-chart-data > .chart',
      size: {
        height: 236,
        // width: 170
      },
      data: {
        json: [],
        x: 'time',
        xFormat: '%Y-%m-%dT%H:%M:%S.%LZ'
      },
      point: {
        show: false
      },
      color: {
        pattern: ['#3556DE', '#FE605D']
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: this.optionSelectorSvc.getInterval() == '1h' || this.optionSelectorSvc.getInterval() == '1d' ? '%H:%M' : '%d/%m',
            count: 60,
            culling: {
              max: 8
            }
          },
          padding: 0,
          localtime: false
        },
        y: {
          padding: 0
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0
      },
      zoom: {
        enabled: true
      }
    });

    //.c3-regions

    // let a_r: SVGCircleElement = document.querySelector('.c3-circle-12');

    // let ins: HTMLElement = document.querySelector('.projection-wrapper');
    // console.log(a_r.cx.baseVal.value)
    // ins.style.left = `${a_r.cx.baseVal.value}px`

    // --------

    // let line = document.querySelector('.c3-xgrid-line line');
    // let projectionLine:HTMLElement = document.querySelector('.projection-line');
    // let projectionTitle:HTMLElement = document.querySelector('.projection-title');
    // console.log(line.getBoundingClientRect().left);
    // let spacing = line.getBoundingClientRect().left - 272 + 'px';
    // projectionLine.style.left = spacing;
    // projectionTitle.style.left = spacing;
    // console.log(line.getBoundingClientRect().left);
  }

  ngOnChanges() {
    if (this.error_loading) {
      this.html_error = this.cardDataSvc.getLoadErrorHtmlContent();
    } else if (this.data && this.data.json.length == 0) {
      this.html_error = this.cardDataSvc.getNoDataHtmlContent();
    } else if (this.data) {
      console.log(this.data.json);
      this.data.keys = {
        x: 'time',
        value: ['fill']
      };
      this.data.names = { fill: 'Preenchimento' };
      this.data.types = { fill: 'area' };
      this.html_error = null;
      this.chart.load({
        json: this.data.json,
        keys: this.data.keys,
        names: this.data.names,
        types: this.data.types,
        duration: 1500
      });
    }
  }

}
