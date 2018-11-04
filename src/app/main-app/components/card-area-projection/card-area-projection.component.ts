import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import * as c3 from 'c3';

@Component({
  selector: 'app-card-area-projection',
  templateUrl: './card-area-projection.component.html',
  styleUrls: ['./card-area-projection.component.scss']
})
export class CardAreaProjectionComponent implements OnInit, AfterViewInit {

  @Input() title: string;
  @Input() data;
  @Input() help_text: string;
  private leftPadding;

  constructor() { }

  ngOnInit() {
    if (this.data) {
      this.generateGraph();
    }
  }

  generateGraph() {
    let max_length = 0;
    this.data.values.json.forEach(element => {
      if (element.volume.toString().length > max_length) {
        max_length = element.volume.toString().length;
      }
      if (element.peso.toString().length > max_length) {
        max_length = element.peso.toString().length;
      }
    });

    this.leftPadding = max_length + 20;

    var chart = c3.generate({
      bindto: '.historic-graph',
      data: this.data.values,
      point: {
        show: false
      },
      color: {
        pattern: ['#2044DB', '#FE605D']
      },
      grid: this.data.grid,
      axis: this.data.axes,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: this.leftPadding
      },
      // size: {
      //   width: 700,
      //   height: 250
      // }
    });

    //.c3-regions

    // let a_r: SVGCircleElement = document.querySelector('.c3-circle-12');

    // let ins: HTMLElement = document.querySelector('.projection-wrapper');
    // console.log(a_r.cx.baseVal.value)
    // ins.style.left = `${a_r.cx.baseVal.value}px`
  }

  ngAfterViewInit() {
    // let line = document.querySelector('.c3-xgrid-line line');
    // let projectionLine:HTMLElement = document.querySelector('.projection-line');
    // let projectionTitle:HTMLElement = document.querySelector('.projection-title');
    // console.log(line.getBoundingClientRect().left);
    // let spacing = line.getBoundingClientRect().left - 272 + 'px';
    // projectionLine.style.left = spacing;
    // projectionTitle.style.left = spacing;
    // console.log(line.getBoundingClientRect().left);
  }

}
