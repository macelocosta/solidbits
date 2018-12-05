import { Component, OnInit } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';
import * as ProgressBar from 'progressbar.js';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private cardDataSvc: CardDataService) { }

  private binUsage;

  ngOnInit() {
    this.cardDataSvc.currentUsage().subscribe(
      data => {
        this.binUsage = data;
        console.log(data);
        this.animateProgressBar(data);
      }
    )
  }

  animateProgressBar(value) {
    let container:HTMLElement = document.querySelector('.progress-bar-container');
    var bar = new ProgressBar.Line(container, {
      strokeWidth: 4,
      easing: 'easeInOut',
      duration: 1500,
      color: '#FFEA82',
      trailColor: '#F1F1F1',
      trailWidth: 4,
      svgStyle: {width: '100%', height: '100%'},
      from: {color: '#FFEA82'},
      to: {color: '#ED6A5A'},
      step: (state, bar) => {
        bar.path.setAttribute('stroke', state.color);
      }
    });
    
    bar.animate(value/100);
  }

}
