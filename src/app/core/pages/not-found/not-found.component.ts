import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private authSvc: AuthenticationService,
              private router: Router) { }

  ngOnInit() {
  }

  onBrandClick() {
    if (this.authSvc.isLocalTokenValid()) {
      this.router.navigate(['/app']);
    } else {
      this.router.navigate(['']);
    }
  }

}
