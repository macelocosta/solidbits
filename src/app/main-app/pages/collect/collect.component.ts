import { Component, OnInit } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';
import { CardData } from '../../models/card-data';

@Component({
  selector: 'app-collect',
  templateUrl: './collect.component.html',
  styleUrls: ['./collect.component.scss']
})
export class CollectComponent implements OnInit {

  constructor(private cardDataSvc:CardDataService) { }

  private currentWeight:CardData;
  private currentVolume:CardData;

  ngOnInit() {
    this.cardDataSvc.currentWeight().subscribe(
      (data) => {
        if (data) {
          let data_ = data;
          data_.units = 'kg';
          this.currentWeight = data_;
        }
      }, error => {
        throw error;
        // this.depositedWeight.errorLoading = true;
      }
    );

    this.cardDataSvc.currentVolume().subscribe(
      data => {
        this.currentVolume = data;
      }, error => {
        throw error;
        // this.depositedWeight.errorLoading = true;
      })
  }

}
