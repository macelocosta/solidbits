import { Component, OnInit, Input } from '@angular/core';
import { CardBasicInfo } from '../../models/card-basic-info';

@Component({
  selector: 'app-card-basic-info',
  templateUrl: './card-basic-info.component.html',
  styleUrls: ['./card-basic-info.component.scss']
})
export class CardBasicInfoComponent implements OnInit {

  @Input() title:string;
  @Input() data:CardBasicInfo;
  @Input() help_text:string;

  constructor() { }

  ngOnInit() {
  }

}
