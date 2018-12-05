import { Component, OnInit } from '@angular/core';
import { CardDataService } from '../../services/card-data.service';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent implements OnInit {

  constructor(private cardDataSvc: CardDataService) { }

  currentUsage;
  lastCollect;
  currentWeight;
  currentVolume;
  noData = {
    value: 'no-data'
  }
  volumeTotalDepositedCollected = { };

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
      }
    )

    this.cardDataSvc.currentUsage().subscribe(
      data => {
        this.currentUsage = data;
        console.log(data);
      }
    )

    setTimeout( () => {
      this.volumeTotalDepositedCollected = {
        json: [
          {date: '2018-12-05', deposited: 0.22, collected: 0.26},
          {date: '2018-12-04', deposited: 0.25, collected: 0.98},
          {date: '2018-12-03', deposited: 0.30, collected: 0.39},
          {date: '2018-12-02', deposited: 0.27, collected: 0.38},
          {date: '2018-12-01', deposited: 0.05, collected: 0.18},
          {date: '2018-11-30', deposited: 0.08, collected: 0.06},
          {date: '2018-11-29', deposited: 0.24, collected: 0.43}
        ],
        keys: {x: 'date', value: ['deposited', 'collected']},
        names: {deposited: 'Depositado', collected: 'Coletado'},
        xFormat: '%Y-%m-%d'
      }
    }, 1500);
  }

}
