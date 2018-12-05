import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CardBasicInfo } from '../../models/card-basic-info';
import { CardData } from '../../models/card-data';
import { OptionSelectorService } from './../../services/option-selector.service';

@Component({
  selector: 'app-card-basic-info',
  templateUrl: './card-basic-info.component.html',
  styleUrls: ['./card-basic-info.component.scss']
})
export class CardBasicInfoComponent implements OnInit, OnChanges {

  @Input() title:string;
  @Input() data:CardData;
  @Input() help_text:string;

  constructor(private optionSelectorSvc:OptionSelectorService) { }

  ngOnInit() {
    this.data = {
      value: undefined,
      growth: undefined,
      units: undefined,
      info: undefined
    }
    this.optionSelectorSvc.measureUnitUpdated.subscribe(
      (data) => {
        console.log("subscription", data, this.data.units);
        if (this.data.units == 'm³' && data == 'l') {
          console.log('m³', this.data.value);
          this.data.value = this.optionSelectorSvc.convertCubicMeterToLitre(this.data.value);
          this.data.units = data;
        } else if (this.data.units == 'l' && data == 'm³') {
          console.log('l', this.data.value);
          this.data.value = this.optionSelectorSvc.convertLitreToCubicMeter(this.data.value);
          this.data.units = data;
        }
      }
    );
  }

  ngOnChanges() {
    if (this.data && this.data.units == 'm3') {
      this.data.value = this.optionSelectorSvc.convertLitreToCubicMeter(this.data.value);
    }
    console.log(this.data)
  }

}
