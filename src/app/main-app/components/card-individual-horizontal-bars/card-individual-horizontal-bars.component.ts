import { Component, Input, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import * as c3 from 'c3';
import { InstanceIdHelperService } from '../../services/instance-id-helper.service';
import { CardData } from '../../models/card-data';

@Component({
  selector: 'app-card-individual-horizontal-bars',
  templateUrl: './card-individual-horizontal-bars.component.html',
  styleUrls: ['./card-individual-horizontal-bars.component.scss']
})
export class CardIndividualHorizontalBarsComponent implements OnInit, AfterViewInit, OnChanges {

  constructor(private instanceIdHelperSvc:InstanceIdHelperService) { }

  @Input() title:string;
  @Input() data:CardData;
  @Input() help_text:string;
  @Input() x_max:number;
  @Input() bar_label_unit:string;
   
  private instance_id = this.instanceIdHelperSvc.getRandomId(6);
  private chart;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.chart = c3.generate({
      bindto: `.individual-horizontal-bar-chart.${this.instance_id}`,
      size: {
        height: 200
      },
      data: {
        json: [],
        type: 'bar',
        labels: {
          format: ((value) => {
            return this.bar_label_unit ? value + " " + this.bar_label_unit : value
          })
        }
      },
      legend: {
        show: false
      },
      zoom: {
        enabled: false
      },
      color: {
        pattern: ['#3556DE', '#183195']
      },
      axis: {
        x: {
          type: 'category',
          tick: {
            // rotate: -30,
            multiline: true,
            // width: 80,
            // height: 100
          }
          // label: 'Local'
        },
        y: {
          max: this.x_max ? this.x_max : null,
          // inner: true
        },
        rotated: true
      },
      tooltip: {
        format: ((value) => {
          return this.bar_label_unit ? value + " " + this.bar_label_unit : value
        })
      },
      padding: {
        // left: 60,
        // bottom: -2
      }
    });
  }

  ngOnChanges() {
    if (this.data) {
      this.data.json.sort(function(a, b) {
        return b.value - a.value;
      });
      this.chart.load({
        json: this.data.json,
        keys: this.data.keys,
        names: this.data.names
      });
    };
  }

}
