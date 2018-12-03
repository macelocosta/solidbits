import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-node-card',
  templateUrl: './node-card.component.html',
  styleUrls: ['./node-card.component.scss']
})
export class NodeCardComponent implements OnInit {

  constructor() { }

  @Input() type:string;
  @Input() cat:string;

  ngOnInit() {
  }
}
