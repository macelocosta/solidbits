import { Component, OnInit, AfterViewInit, Output } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';
import { EventEmitter } from '@angular/core';
declare const panzoom:any;
declare const Snap:any;

@Component({
  selector: 'app-map-viewer',
  templateUrl: './map-viewer.component.html',
  styleUrls: ['./map-viewer.component.scss']
})
export class MapViewerComponent implements OnInit, AfterViewInit {

  constructor(private cardDataSvc:CardDataService) { }

  @Output() coordinates = new EventEmitter();
  @Output() floor = new EventEmitter();
  data;
  draw;
  group;
  circle;
  private bin_;

  ngOnInit() {
    this.cardDataSvc.getFloors().subscribe(
      data => { 
        this.data = data;
        this.switchFloor(0);
      }, error => {
        throw error;
      }
    );

    this.cardDataSvc.mapData().subscribe(
      data => {
        this.bin_ = data;
      }, error => {
        throw error;
      }
    )
  }

  ngAfterViewInit() {
    this.draw = Snap('#canvas');
    this.group = this.draw.group();
    let zoomable = document.querySelector('.zoomable');
    panzoom(zoomable);
  }

  switchFloor(i) {
    this.group.clear();
    Snap.load('https://localhost/static/5c009178ff32692c38f95373/floors/' + this.data[i].filename, (data) => {
      this.group.append(data);
    });
    let seletores = document.querySelectorAll('.seletor li');
    for (let i = 0; i < seletores.length; i++) {
      seletores[i].classList.remove('current');
    }
    if (seletores[i]) {
      seletores[i].classList.add('current');
    }
    if (i == 1) {
      this.circle = this.draw.circle(this.bin_.coordinates.x, this.bin_.coordinates.y, 7);
      if (this.bin_.status == 0) {
        this.circle.attr('fill', '#fe3517');
      } else {
        this.circle.attr('fill', '#8cc34b');
      }
    } else {
      if (this.circle) {
        this.circle.remove();
      }
    }
    this.floor.emit(i);
  }
}
