import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OptionSelectorService {

  timeUpdated:EventEmitter<any> = new EventEmitter();
  measureUnitUpdated:EventEmitter<any> = new EventEmitter();

  constructor() { }

  private time = '1h';
  private interval = '1m';
  private volume_measure_unit = 'l';
  private volume_measure_multiplier = 1;

  getTime():any {
    return this.time;
  }

  setTime(time):void {
    if (time) {
      this.time = time;
      if (time == '1h') {
        this.setInterval('1m');
      } else if (time == '1d') {
        this.setInterval('123428ms');
        // this.setInterval('40m');
      } else if (time == '1w') {
        this.setInterval('740654ms');
        // this.setInterval('168m');
      } else if (time == '4w') {
        this.setInterval('3702857ms');
        // this.setInterval('11h');
      }
      this.timeUpdated.emit(this.time);
    }
  }
  
  getInterval():any {
    return this.interval;
  }

  setInterval(interval):void {
    this.interval = interval;
  }

  setVolumeMeasureUnit(unit):void {
    console.log('setting new unit: ', unit);
    if (unit == 'l') {
      // if (this.volume_measure_unit == 'l') {
        this.volume_measure_unit = 'l';
        this.volume_measure_multiplier = 1;
      // } else(this.volume_measure_unit == 'm³') {
        // this.volume_measure_unit = 'm³'
      // }
    } else if (unit == 'm³') {
      if (this.volume_measure_unit == 'l') {
        this.volume_measure_multiplier = 0.001;
      } else if (this.volume_measure_unit == 'm³') {
        this.volume_measure_multiplier = 1000.0;
      }
      this.volume_measure_unit = 'm³';
    }
    this.measureUnitUpdated.emit({unit: this.volume_measure_unit, multiplier: this.volume_measure_multiplier});
  }

  getVolumeMeasureMultiplier():number {
    return this.volume_measure_multiplier;
  }

  getVolumeMeasureUnits():string {
    return this.volume_measure_unit;
  }

  convertLitreToCubicMeter(value:number):number {
    return value * 0.001;
  }

  convertCubicMeterToLitre(value:number):number {
    return value * 1000.0;
  }

  // updateSingleValue(value:number):number {
  //   if (this.volume_measure_unit == 'l') {
  //     return value * 0.001;
  //   } else if (this.volume_measure_unit == 'm³') {
  //     return value * 1000;
  //   }
  // }

}
