import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-node-card',
  templateUrl: './node-card.component.html',
  styleUrls: ['./node-card.component.scss']
})
export class NodeCardComponent implements OnInit, OnChanges {

  constructor() { }

  @Input() type:string;
  @Input() cat:string;
  @Input() data:any;
  node_bins;
  node_rooms;

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.data && this.data.children) {
      console.log(this.data);
    }
  }
}
