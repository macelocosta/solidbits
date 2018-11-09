import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-map',
  templateUrl: './card-map.component.html',
  styleUrls: ['./card-map.component.scss']
})
export class CardMapComponent implements OnInit {

  @Input() title:string;
  @Input() help_text:string;
  @Input() data:any;

  constructor() { }

  ngOnInit() {
  }

}
