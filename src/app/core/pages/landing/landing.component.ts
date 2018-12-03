import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private authSvc:AuthenticationService) { }

  ngOnInit() {
    this.authSvc.isAuthenticated().subscribe(isAuth => {
      console.log(isAuth);
    });
  }

}
