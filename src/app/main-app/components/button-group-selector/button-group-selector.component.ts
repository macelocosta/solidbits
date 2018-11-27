import { Component, OnInit, AfterViewInit, Input, OnChanges } from '@angular/core';

import { InstanceIdHelperService } from './../../services/instance-id-helper.service';
import { OptionSelectorService } from 'src/app/shared/services/option-selector.service';

@Component({
  selector: 'app-button-group-selector',
  templateUrl: './button-group-selector.component.html',
  styleUrls: ['./button-group-selector.component.scss']
})
export class ButtonGroupSelectorComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() values = [];
  @Input() type:string;

  constructor(private instanceIdHelperSvc:InstanceIdHelperService,
              private optionSelectorSvc:OptionSelectorService) { }
  
  public instance_id = this.instanceIdHelperSvc.getRandomId(6);

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.toggleActive(0);
  }

  ngOnChanges() {
    if (this.type == 'volume') {
      this.values = [
        { desc: 'Volume em l', int: 'l' },
        { desc: 'm³', int: 'm³' }
      ];
    } else if (this.type == 'time') {
      this.values = [
        { desc: 'Última hora', int: '1h' }, 
        { desc: 'dia', int: '1d' }, 
        { desc: 'semana', int: '1w' }, 
        { desc: 'mês', int: '4w' }
      ];
    }
  }

  toggleActive(index) {
    let selectors:NodeListOf<HTMLElement> = document.querySelectorAll('#' + this.instance_id + ' li');
    for (let i = 0; i < selectors.length; i++) {
      selectors[i].classList.remove('active');
      if (index == i) {
        selectors[i].classList.add('active');
        if (this.type == 'time') {
          this.optionSelectorSvc.setTime(this.values[i].int);
        } else if (this.type == 'volume') {
          this.optionSelectorSvc.setVolumeMeasureUnit(this.values[i].int);
        }
      }
    }
  }

}