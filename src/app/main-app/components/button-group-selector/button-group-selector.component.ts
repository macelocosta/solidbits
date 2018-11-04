import { Component, OnInit, AfterViewInit, Input } from '@angular/core';

import { InstanceIdHelperService } from './../../services/instance-id-helper.service';

@Component({
  selector: 'app-button-group-selector',
  templateUrl: './button-group-selector.component.html',
  styleUrls: ['./button-group-selector.component.scss']
})
export class ButtonGroupSelectorComponent implements OnInit, AfterViewInit {

  @Input() values = [];

  constructor(private instanceIdHelperSvc: InstanceIdHelperService) { }
  
  public instance_id = this.instanceIdHelperSvc.getRandomId(6);

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.toggleActive(0);
  }

  toggleActive(index) {
    let selectors:NodeListOf<HTMLElement> = document.querySelectorAll('#' + this.instance_id + ' li');
    for (let i = 0; i < selectors.length; i++) {
      selectors[i].classList.remove('active');
      if (index == i) {
        selectors[i].classList.add('active');
      }
    }
  }

}